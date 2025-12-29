<template>
  <div class="p-4 bg-black/40 rounded-md">
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-white font-medium">Organize Cards</h4>
      <div class="flex gap-2">
        <button @click="shuffle" class="px-2 py-1 bg-white/5 rounded text-sm">
          Shuffle
        </button>
        <button
          @click="sortByName"
          class="px-2 py-1 bg-white/5 rounded text-sm"
        >
          Sort A→Z
        </button>
        <button
          @click="sortByYear"
          class="px-2 py-1 bg-white/5 rounded text-sm"
        >
          Sort Year
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div v-for="(c, i) in cards" :key="c.id" class="p-3 bg-white/5 rounded">
        <div class="flex justify-between items-start">
          <div>
            <div class="font-medium text-white">{{ c.title }}</div>
            <div class="text-sm text-gray-300">{{ c.desc }}</div>
          </div>
          <div class="text-xs text-gray-400">{{ c.year }}</div>
        </div>
        <div class="mt-3 flex gap-2">
          <button
            @click="moveUp(i)"
            class="px-2 py-1 bg-white/3 rounded text-sm"
          >
            ↑
          </button>
          <button
            @click="moveDown(i)"
            class="px-2 py-1 bg-white/3 rounded text-sm"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const cards = reactive([
  { id: 1, title: 'Portal Educação', desc: 'Edu portal', year: 2017 },
  { id: 2, title: 'E-commerce A', desc: 'Online store', year: 2018 },
  { id: 3, title: 'Analytics Dashboard', desc: 'Data viz', year: 2019 },
  { id: 4, title: 'ERP Interno', desc: 'Internal ERP', year: 2020 },
])

function shuffle() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
}

function sortByName() {
  cards.sort((a, b) => a.title.localeCompare(b.title))
}

function sortByYear() {
  cards.sort((a, b) => a.year - b.year)
}

function moveUp(i) {
  if (i <= 0) return
  const tmp = cards[i - 1]
  cards[i - 1] = cards[i]
  cards[i] = tmp
}

function moveDown(i) {
  if (i >= cards.length - 1) return
  const tmp = cards[i + 1]
  cards[i + 1] = cards[i]
  cards[i] = tmp
}
</script>
