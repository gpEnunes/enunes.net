<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800"
  >
    <Navbar />
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article v-if="post" class="prose prose-invert max-w-none">
        <div class="mb-8">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
            {{ post.title }}
          </h1>
          <div class="flex items-center justify-between text-gray-300">
            <div>
              <span class="text-sm">{{ formatDate(post.date) }}</span>
              <span class="mx-2">•</span>
              <span class="text-sm">{{ post.author }}</span>
            </div>
          </div>
        </div>

        <ContentRenderer :value="post" />

        <div class="mt-16 pt-8 border-t border-white/10">
          <NuxtLink
            to="/#blog"
            class="inline-block px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
          >
            ← Back to Blog
          </NuxtLink>
        </div>
      </article>
      <div v-else class="text-center text-gray-300">
        <p>Post not found</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: post, error } = await useAsyncData(
  `blog-post-${route.params.slug}`,
  () => queryCollection('blog').path(`/blog/${route.params.slug}`).first()
)

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
:deep(.prose) {
  --tw-prose-body: rgb(209, 213, 219);
  --tw-prose-headings: rgb(255, 255, 255);
  --tw-prose-bold: rgb(255, 255, 255);
  --tw-prose-code: rgb(226, 232, 240);
  --tw-prose-pre-bg: rgb(15, 23, 42);
  --tw-prose-pre-code: rgb(226, 232, 240);
  --tw-prose-links: rgb(147, 197, 253);
  --tw-prose-hr: rgb(51, 65, 85);
}
</style>
