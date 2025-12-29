<template>
  <div class="p-4 bg-black/40 rounded-md">
    <h4 class="text-white font-medium mb-3">Drag & Drop Reorder</h4>
    <ul class="space-y-2">
      <li
        v-for="(item, idx) in items"
        :key="item.id"
        class="p-3 bg-white/5 rounded cursor-move"
        draggable="true"
        @dragstart="onDragStart($event, idx)"
        @dragover.prevent
        @drop="onDrop($event, idx)"
      >
        <div class="flex justify-between items-center">
          <div class="text-white">{{ item.text }}</div>
          <div class="text-xs text-gray-300">{{ idx + 1 }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const items = reactive([
  { id: 'a', text: 'Item A' },
  { id: 'b', text: 'Item B' },
  { id: 'c', text: 'Item C' },
  { id: 'd', text: 'Item D' },
])

let dragIndex = null

function onDragStart(e, idx) {
  dragIndex = idx
  e.dataTransfer.effectAllowed = 'move'
}

function onDrop(e, idx) {
  if (dragIndex === null) return
  const dragged = items[dragIndex]
  items.splice(dragIndex, 1)
  items.splice(idx, 0, dragged)
  dragIndex = null
}
</script>
