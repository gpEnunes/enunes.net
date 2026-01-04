<template>
  <section
    id="home"
    class="bg-gradient-to-b from-black/60 via-black/50 to-transparent text-white py-20"
  >
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start gap-8"
    >
      <div class="flex-1">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
        >
          Emerson Nunes — Fullstack developer
        </h1>
        <p class="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl">
          <span class="mr-2">I build products with</span>
          <span class="font-mono text-indigo-300" aria-live="polite">{{
            heroText
          }}</span>
          <span class="inline-block ml-2 text-indigo-300" aria-hidden="true"
            >|</span
          >
        </p>
        <div class="mt-6 flex items-center gap-3">
          <a
            href="#demo"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md"
            >See demo</a
          >
          <a href="#projects" class="text-sm text-gray-300 hover:text-white"
            >Projects</a
          >
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <div class="rounded-lg border border-white/5 p-4 text-sm text-gray-300">
          <div class="font-medium text-white">About me</div>
          <div class="mt-2">
            Fullstack developer passionate about Laravel and Vue 3. I build
            scalable applications with modern tools and clean code.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const heroText = ref('')
const heroPhrases = [
  'Laravel',
  'Fullstack (Laravel + Vue)',
  'Vue 3 (learning)',
  'Vue 2 (comfortable)',
  'React · Next.js',
  'Angular · NestJS',
  'TypeScript',
  'APIs & Design Systems',
]

function startHeroTyping() {
  let pIndex = 0
  let cIndex = 0
  let deleting = false

  function step() {
    const phrase = heroPhrases[pIndex % heroPhrases.length]
    if (!deleting) {
      heroText.value = phrase.slice(0, cIndex + 1)
      cIndex++
      if (cIndex >= phrase.length) {
        deleting = true
        setTimeout(step, 900)
        return
      }
      setTimeout(step, 80)
    } else {
      heroText.value = phrase.slice(0, cIndex - 1)
      cIndex--
      if (cIndex <= 0) {
        deleting = false
        pIndex++
        setTimeout(step, 300)
        return
      }
      setTimeout(step, 40)
    }
  }

  step()
}

onMounted(() => startHeroTyping())
</script>
