<template>
  <section
    id="demo"
    class="split grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    aria-label="Demos"
  >
    <div
      class="code-panel"
      role="region"
      aria-label="Código com efeito typewriter"
      ref="codePanel"
    >
      <div class="code-header flex items-center justify-between">
        <div class="dots flex items-center gap-1">
          <span class="dot w-3 h-3 rounded-full bg-red-500"></span>
          <span class="dot w-3 h-3 rounded-full bg-yellow-400"></span>
          <span class="dot w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <span class="text-xs text-gray-300">algorithms.js</span>
      </div>
      <pre
        class="mt-3 bg-black/40 rounded-md p-4 text-sm text-gray-100 overflow-x-auto"
        ref="codeEl"
      ><span class="cursor" aria-hidden="true"></span></pre>
    </div>

    <div class="viz-panel" role="region" aria-label="Resultado do código">
      <div class="viz-header flex items-center justify-between">
        <h3 id="vizTitle" class="text-lg font-medium text-white" ref="vizTitle">
          Demo output
        </h3>
        <div class="viz-tabs">
          <button
            class="tab px-2 py-1 text-sm bg-white/5 rounded mr-2"
            data-view="top"
          >
            Top
          </button>
          <button
            class="tab px-2 py-1 text-sm bg-white/5 rounded mr-2"
            data-view="map"
          >
            Map
          </button>
          <button
            class="tab px-2 py-1 text-sm bg-white/5 rounded"
            data-view="timeline"
          >
            Timeline
          </button>
        </div>
      </div>
      <div id="viz" class="mt-4 space-y-4">
        <div class="bars space-y-2" ref="bars"></div>
        <div
          class="chips flex flex-wrap gap-2"
          ref="chips"
          style="display: none"
        ></div>
        <div
          class="timeline space-y-2"
          ref="timeline"
          style="display: none"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const codeEl = ref(null)
const codePanel = ref(null)
const bars = ref(null)
const chips = ref(null)
const timeline = ref(null)
const vizTitle = ref(null)

const projects = [
  {
    name: 'Portal Educação',
    year: 2017,
    tags: ['PHP', 'Vue', 'MySQL', 'Docker'],
  },
  {
    name: 'E-commerce A',
    year: 2018,
    tags: ['PHP', 'Laravel', 'Vue', 'Stripe', 'Redis'],
  },
  {
    name: 'Analytics Dashboard',
    year: 2019,
    tags: ['Node', 'TypeScript', 'Vue', 'Postgres', 'Docker'],
  },
  {
    name: 'ERP Interno',
    year: 2020,
    tags: ['PHP', 'Symfony', 'TypeScript', 'Docker', 'RabbitMQ'],
  },
  {
    name: 'Portal Saúde',
    year: 2021,
    tags: ['PHP', 'Laravel', 'Vue', 'MySQL', 'Docker'],
  },
  {
    name: 'Fintech Reports',
    year: 2022,
    tags: ['TypeScript', 'React', 'Postgres', 'Docker', 'Kafka'],
  },
  {
    name: 'Plataforma IoT',
    year: 2023,
    tags: ['Node', 'TypeScript', 'Vue', 'TimescaleDB', 'Docker'],
  },
  {
    name: 'AI Ops PoC',
    year: 2024,
    tags: ['Python', 'TypeScript', 'Vue', 'Docker', 'Postgres'],
  },
]

const countFreq = (arr) =>
  arr.reduce((acc, t) => ((acc[t] = (acc[t] || 0) + 1), acc), {})
const sortDesc = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])
const groupByYear = (list) =>
  list.reduce((acc, p) => ((acc[p.year] ??= []).push(p), acc), {})
const groupByTag = (list) => {
  const g = {}
  list.forEach((p) => p.tags.forEach((tag) => (g[tag] ??= []).push(p.name)))
  return g
}

function renderTopBars(entries) {
  const el = bars.value
  if (!el) return
  el.innerHTML = ''
  const max = Math.max(...entries.map(([_, v]) => v))
  entries.slice(0, 5).forEach(([label, value]) => {
    const row = document.createElement('div')
    row.className = 'bar flex items-center gap-3'
    const lab = document.createElement('div')
    lab.className = 'bar-label w-32 text-sm text-gray-300'
    lab.textContent = label
    const fill = document.createElement('div')
    fill.className = 'bar-fill bg-white/5 rounded h-3 flex-1 overflow-hidden'
    const span = document.createElement('div')
    span.style.width = '0%'
    span.className = 'bg-indigo-500 h-3'
    const val = document.createElement('div')
    val.className = 'bar-value w-8 text-sm text-gray-300 text-right'
    val.textContent = String(value)
    fill.appendChild(span)
    row.append(lab, fill, val)
    el.appendChild(row)
    requestAnimationFrame(() => {
      span.style.width = `${(value / max) * 100}%`
    })
  })
}

function renderCategoryChips(grouped) {
  const el = chips.value
  if (!el) return
  el.innerHTML = ''
  Object.entries(grouped)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 12)
    .forEach(([tag, names]) => {
      const chip = document.createElement('div')
      chip.className = 'chip bg-white/5 text-sm px-3 py-1 rounded text-gray-200'
      chip.textContent = `${tag} · ${names.length}`
      el.appendChild(chip)
    })
}

function renderTimeline(byYear) {
  const el = timeline.value
  if (!el) return
  el.innerHTML = ''
  Object.entries(byYear)
    .sort((a, b) => a[0] - b[0])
    .forEach(([year, items]) => {
      const ev = document.createElement('div')
      ev.className = 'event'
      const time = document.createElement('div')
      time.className = 'time font-medium text-gray-100'
      time.textContent = year
      const desc = document.createElement('div')
      desc.className = 'desc text-sm text-gray-300'
      desc.textContent = items.map((i) => i.name).join(' • ')
      ev.append(time, desc)
      el.appendChild(ev)
    })
}

const codeLines = [
  `// Demo dataset - projects`,
  `const projects = /* ... */;`,
  `// 1) MAP: collect all tags`,
  `const allTags = projects.flatMap(p => p.tags);`,
  `// 2) COUNT: frequencies by tag`,
  `const freq = countFreq(allTags);`,
  `// 3) SORT: Top 5 tags`,
  `const top = sortDesc(freq).slice(0, 5);`,
  `renderTopBars(top);`,
  `// 4) MAP: group projects by tag`,
  `const groupedByTag = groupByTag(projects);`,
  `renderCategoryChips(groupedByTag);`,
  `// 5) MAP: timeline by year`,
  `const byYear = groupByYear(projects);`,
  `renderTimeline(byYear);`,
]

function startCodeTyping() {
  const el = codeEl.value
  if (!el) return
  let lineIndex = 0
  let charIndex = 0

  function stepType() {
    if (lineIndex >= codeLines.length) return
    const line = codeLines[lineIndex]
    if (charIndex <= line.length) {
      el.textContent =
        el.textContent +
        line.substring(0, charIndex) +
        (charIndex === line.length ? '\n' : '')
      charIndex++
      setTimeout(stepType, 20)
    } else {
      triggerViz(lineIndex)
      lineIndex++
      charIndex = 0
      setTimeout(stepType, 250)
    }
  }

  stepType()
}

function triggerViz(i) {
  switch (i) {
    case 6: {
      const freq = countFreq(projects.flatMap((p) => p.tags))
      const top = sortDesc(freq)
      if (vizTitle.value) vizTitle.value.textContent = 'Top 5 tags (sort)'
      if (bars.value) bars.value.style.display = ''
      if (chips.value) chips.value.style.display = 'none'
      if (timeline.value) timeline.value.style.display = 'none'
      renderTopBars(top)
      break
    }
    case 9: {
      if (vizTitle.value)
        vizTitle.value.textContent = 'Categorias por tag (map)'
      if (bars.value) bars.value.style.display = 'none'
      if (chips.value) chips.value.style.display = ''
      if (timeline.value) timeline.value.style.display = 'none'
      renderCategoryChips(groupByTag(projects))
      break
    }
    case 12: {
      if (vizTitle.value) vizTitle.value.textContent = 'Timeline por ano (map)'
      if (bars.value) bars.value.style.display = 'none'
      if (chips.value) chips.value.style.display = 'none'
      if (timeline.value) timeline.value.style.display = ''
      renderTimeline(groupByYear(projects))
      break
    }
    default:
      break
  }
}

onMounted(() => {
  // Tabs
  const root = codePanel.value?.parentElement
  if (root) {
    root.querySelectorAll?.('.tab')?.forEach((btn) => {
      btn.addEventListener('click', () => {
        root
          .querySelectorAll('.tab')
          ?.forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
        const view = btn.dataset.view
        if (view === 'top') {
          const freq = countFreq(projects.flatMap((p) => p.tags))
          const top = sortDesc(freq)
          if (vizTitle.value) vizTitle.value.textContent = 'Top 5 tags (sort)'
          if (bars.value) bars.value.style.display = ''
          if (chips.value) chips.value.style.display = 'none'
          if (timeline.value) timeline.value.style.display = 'none'
          renderTopBars(top)
        } else if (view === 'map') {
          if (vizTitle.value)
            vizTitle.value.textContent = 'Categorias por tag (map)'
          if (bars.value) bars.value.style.display = 'none'
          if (chips.value) chips.value.style.display = ''
          if (timeline.value) timeline.value.style.display = 'none'
          renderCategoryChips(groupByTag(projects))
        } else {
          if (vizTitle.value)
            vizTitle.value.textContent = 'Timeline por ano (map)'
          if (bars.value) bars.value.style.display = 'none'
          if (chips.value) chips.value.style.display = 'none'
          if (timeline.value) timeline.value.style.display = ''
          renderTimeline(groupByYear(projects))
        }
      })
    })
  }

  // Start typing when visible
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          startCodeTyping()
          obs.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )
  if (codePanel.value) obs.observe(codePanel.value)
})
</script>
