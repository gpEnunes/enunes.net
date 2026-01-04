<template>
  <section id="portfolio" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="space-y-8">
      <div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Portfolio
        </h2>
        <p class="text-gray-300 max-w-3xl">
          Projects that I'm currenty working on or have worked on in the past.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="portfolioItem in portfolios"
          class="p-4 rounded-lg border border-white/10 bg-white/5"
        >
          <div class="font-medium text-white">{{ portfolioItem.title }}</div>
          <div class="text-sm text-gray-300 mt-1">
            {{ portfolioItem.tech }} - {{ portfolioItem.year }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const portfolios = [
  {
    title: 'Spotify Library Optimizer',
    tech: 'Laravel, Vue, Spotify API',
    year: 2025,
  },
]
</script>
