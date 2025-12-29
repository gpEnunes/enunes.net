<template>
  <section id="demo" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Code panel -->
      <div ref="codePanel" class="code-panel">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <div class="text-xs text-gray-300">algorithms.js</div>
        </div>
        <pre
          ref="codeEl"
          class="bg-black/40 rounded-md p-4 text-sm text-gray-100 min-h-[180px] whitespace-pre-wrap"
        ></pre>
      </div>

      <!-- Viz / demos selector -->
      <div class="viz-panel">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-medium text-white">Demos</h3>
          <div class="flex gap-2">
            <button
              @click="selectDemo('cards')"
              :class="btnClass('cards')"
              class="px-2 py-1 rounded text-sm"
            >
              Organize
            </button>
            <button
              @click="selectDemo('drag')"
              :class="btnClass('drag')"
              class="px-2 py-1 rounded text-sm"
            >
              Drag & Drop
            </button>
            <button
              @click="selectDemo('clock')"
              :class="btnClass('clock')"
              class="px-2 py-1 rounded text-sm"
            >
              Local Time
            </button>
          </div>
        </div>

        <div>
          <component :is="demoComponents[activeDemo]" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DemoCards from './DemoCards.vue'
import DemoDragDrop from './DemoDragDrop.vue'
import DemoClock from './DemoClock.vue'

const codeEl = ref(null)
const codePanel = ref(null)
const activeDemo = ref('cards')

const demoComponents = {
  cards: DemoCards,
  drag: DemoDragDrop,
  clock: DemoClock,
}

const codeLinesMap = {
  cards: [
    '// Cards demo: organize and sort items',
    'cards = [{title, year, desc}, ...]',
    'shuffle()',
    'sortByName()',
    'moveUp(index)',
  ],
  drag: [
    '// Drag & Drop demo: reorderable list',
    'onDragStart(e, idx)',
    'onDrop(e, idx)',
    'items.splice(...)',
  ],
  clock: [
    '// Clock demo: show local time for timezone',
    'Intl.DateTimeFormat(timeZone).format(new Date())',
    'setInterval(update, 1000)',
  ],
}

let codeLines = []

function startCodeTyping() {
  const el = codeEl.value
  if (!el) return
  el.textContent = ''
  codeLines = codeLinesMap[activeDemo.value] || []
  let lineIndex = 0
  let charIndex = 0

  function step() {
    if (lineIndex >= codeLines.length) return
    const line = codeLines[lineIndex]
    if (charIndex <= line.length) {
      el.textContent =
        el.textContent +
        line.substring(0, charIndex) +
        (charIndex === line.length ? '\n' : '')
      charIndex++
      setTimeout(step, 25)
    } else {
      // trigger simple viz action placeholder (no-op here)
      lineIndex++
      charIndex = 0
      setTimeout(step, 200)
    }
  }

  step()
}

function btnClass(key) {
  return activeDemo.value === key
    ? 'bg-white/10 text-white'
    : 'bg-white/5 text-gray-300'
}

function selectDemo(key) {
  activeDemo.value = key
  startCodeTyping()
}

onMounted(() => {
  // start typing when code panel is visible
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
