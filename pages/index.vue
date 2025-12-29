<template>
  <div>
    <Navbar />
    <section class="hero">
      <h1>Do dado bruto ao insight elegante</h1>
      <p>
        Split-screen com código e execução visual: sort de grandes volumes em
        “Top 5” e mapeamento para categorias/timeline.
      </p>
      <a class="cta" href="#demo">Ver demonstração</a>
    </section>
    <section
      id="demo"
      class="split"
      aria-label="Seção com execução visual do código"
    >
      <div
        class="code-panel"
        role="region"
        aria-label="Código com efeito typewriter"
      >
        <div class="code-header">
          <div class="dots">
            <span class="dot red"></span><span class="dot yellow"></span
            ><span class="dot green"></span>
          </div>
          <span>storytelling.js</span>
        </div>
        <pre id="code"><span class="cursor" aria-hidden="true"></span></pre>
      </div>
      <div class="viz-panel" role="region" aria-label="Resultado do código">
        <div class="viz-header">
          <h3 id="vizTitle">Top 5 tags (sort)</h3>
          <div class="viz-tabs">
            <button class="tab active" data-view="top">Top</button>
            <button class="tab" data-view="map">Categorias</button>
            <button class="tab" data-view="timeline">Timeline</button>
          </div>
        </div>
        <div id="viz">
          <div class="bars" id="bars"></div>
          <div class="chips" id="chips" style="display: none"></div>
          <div class="timeline" id="timeline" style="display: none"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'

onMounted(() => {
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
    list.reduce((acc, p) => ((acc[p.year] ?? []).push(p), acc), {})
  const groupByTag = (list) => {
    const g = {}
    list.forEach((p) => p.tags.forEach((tag) => (g[tag] ??= []).push(p.name)))
    return g
  }

  function renderTopBars(entries) {
    const bars = document.getElementById('bars')
    if (!bars) return
    bars.innerHTML = ''
    const max = Math.max(...entries.map(([_, v]) => v))
    entries.slice(0, 5).forEach(([label, value]) => {
      const row = document.createElement('div')
      row.className = 'bar'
      const lab = document.createElement('div')
      lab.className = 'bar-label'
      lab.textContent = label
      const fill = document.createElement('div')
      fill.className = 'bar-fill'
      const span = document.createElement('span')
      span.style.width = '0%'
      const val = document.createElement('div')
      val.className = 'bar-value'
      val.textContent = String(value)
      fill.appendChild(span)
      row.append(lab, fill, val)
      bars.appendChild(row)
      requestAnimationFrame(() => {
        span.style.width = `${(value / max) * 100}%`
      })
    })
  }

  function renderCategoryChips(grouped) {
    const chips = document.getElementById('chips')
    if (!chips) return
    chips.innerHTML = ''
    Object.entries(grouped)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 12)
      .forEach(([tag, names]) => {
        const chip = document.createElement('div')
        chip.className = 'chip'
        chip.textContent = `${tag} · ${names.length}`
        chips.appendChild(chip)
      })
  }

  function renderTimeline(byYear) {
    const tl = document.getElementById('timeline')
    if (!tl) return
    tl.innerHTML = ''
    Object.entries(byYear)
      .sort((a, b) => a[0] - b[0])
      .forEach(([year, items]) => {
        const ev = document.createElement('div')
        ev.className = 'event'
        const time = document.createElement('div')
        time.className = 'time'
        time.textContent = year
        const desc = document.createElement('div')
        desc.className = 'desc'
        desc.textContent = items.map((i) => i.name).join(' • ')
        ev.append(time, desc)
        tl.appendChild(ev)
      })
  }

  const codeLines = [
    `// Dados de projetos (simulação de grande volume)`,
    `const projects = /* ... */;`,
    `// 1) MAP: coletar todas as tags`,
    `const allTags = projects.flatMap(p => p.tags);`,
    `// 2) COUNT: frequências por tag`,
    `const freq = countFreq(allTags);`,
    `// 3) SORT: Top 5 tags`,
    `const top = sortDesc(freq).slice(0, 5);`,
    `renderTopBars(top);`,
    `// 4) MAP: agrupar projetos por tag`,
    `const groupedByTag = groupByTag(projects);`,
    `renderCategoryChips(groupedByTag);`,
    `// 5) MAP: timeline por ano`,
    `const byYear = groupByYear(projects);`,
    `renderTimeline(byYear);`,
    `// Insight: evolução de stack e foco por período`,
  ]

  let lineIndex = 0,
    charIndex = 0
  const codeEl = document.getElementById('code')

  function stepType() {
    if (!codeEl) return
    if (lineIndex >= codeLines.length) {
      const cur = document.querySelector('.cursor')
      if (cur) cur.style.display = 'none'
      return
    }
    const line = codeLines[lineIndex]
    const cur = document.querySelector('.cursor')
    if (charIndex <= line.length) {
      if (cur) cur.remove()
      const chunk = line.substring(0, charIndex)
      codeEl.innerHTML =
        codeEl.innerHTML +
        chunk +
        (charIndex === line.length ? '\n' : '') +
        '<span class="cursor"></span>'
      charIndex++
      setTimeout(stepType, 14)
    } else {
      triggerViz(lineIndex)
      lineIndex++
      charIndex = 0
      setTimeout(stepType, 400)
    }
  }

  function triggerViz(i) {
    switch (i) {
      case 6: {
        const freq = countFreq(projects.flatMap((p) => p.tags))
        const top = sortDesc(freq)
        document.getElementById('vizTitle').textContent = 'Top 5 tags (sort)'
        document.getElementById('bars').style.display = ''
        document.getElementById('chips').style.display = 'none'
        document.getElementById('timeline').style.display = 'none'
        renderTopBars(top)
        break
      }
      case 9: {
        document.getElementById('vizTitle').textContent =
          'Categorias por tag (map)'
        document.getElementById('bars').style.display = 'none'
        document.getElementById('chips').style.display = ''
        document.getElementById('timeline').style.display = 'none'
        renderCategoryChips(groupByTag(projects))
        break
      }
      case 12: {
        document.getElementById('vizTitle').textContent =
          'Timeline por ano (map)'
        document.getElementById('bars').style.display = 'none'
        document.getElementById('chips').style.display = 'none'
        document.getElementById('timeline').style.display = ''
        renderTimeline(groupByYear(projects))
        break
      }
      default:
        break
    }
  }

  document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.tab')
        .forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      const view = btn.dataset.view
      if (view === 'top') {
        const freq = countFreq(projects.flatMap((p) => p.tags))
        const top = sortDesc(freq)
        document.getElementById('vizTitle').textContent = 'Top 5 tags (sort)'
        document.getElementById('bars').style.display = ''
        document.getElementById('chips').style.display = 'none'
        document.getElementById('timeline').style.display = 'none'
        renderTopBars(top)
      } else if (view === 'map') {
        document.getElementById('vizTitle').textContent =
          'Categorias por tag (map)'
        document.getElementById('bars').style.display = 'none'
        document.getElementById('chips').style.display = ''
        document.getElementById('timeline').style.display = 'none'
        renderCategoryChips(groupByTag(projects))
      } else {
        document.getElementById('vizTitle').textContent =
          'Timeline por ano (map)'
        document.getElementById('bars').style.display = 'none'
        document.getElementById('chips').style.display = 'none'
        document.getElementById('timeline').style.display = ''
        renderTimeline(groupByYear(projects))
      }
    })
  })

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          stepType()
          obs.disconnect()
        }
      })
    },
    { threshold: 0.25 }
  )
  const target = document.querySelector('.code-panel')
  if (target) obs.observe(target)
})
</script>
