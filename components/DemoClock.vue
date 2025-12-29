<template>
  <div class="p-4 bg-black/40 rounded-md">
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-white font-medium">Local Time</h4>
      <select v-model="tz" class="bg-white/5 text-sm rounded px-2 py-1">
        <option value="UTC">UTC</option>
        <option value="Europe/Lisbon">Lisbon</option>
        <option value="America/New_York">New York</option>
        <option value="Asia/Tokyo">Tokyo</option>
      </select>
    </div>
    <div class="text-3xl font-mono text-indigo-300">{{ timeString }}</div>
    <div class="mt-2 text-sm text-gray-300">Timezone: {{ tz }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const tz = ref('UTC')
const timeString = ref('')
let timer = null

function update() {
  const now = new Date()
  timeString.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: tz.value,
  }).format(now)
}

onMounted(() => {
  update()
  timer = setInterval(update, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>
