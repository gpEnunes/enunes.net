<template>
  <section id="blog" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="space-y-8">
      <div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Blog</h2>
        <p class="text-gray-300 max-w-3xl">
          Thoughts on web development, software engineering, and the journey to
          becoming a senior fullstack developer.
        </p>
      </div>

      <div class="space-y-4">
        <NuxtLink
          v-for="post in posts"
          :key="post._path"
          :to="post._path"
          class="block p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <h3 class="text-lg font-medium text-white">{{ post.title }}</h3>
          <p class="text-sm text-gray-300 mt-1">{{ post.description }}</p>
          <div class="flex items-center justify-between mt-2">
            <div class="text-xs text-gray-400">{{ formatDate(post.date) }}</div>
            <div class="text-xs text-gray-400">{{ post.author }}</div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  posts.value = await queryContent('blog').sort({ date: -1 }).find()
})
</script>
