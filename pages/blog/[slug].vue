<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800"
  >
    <Navbar />
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article v-if="post" class="prose prose-invert max-w-none">
        <div class="mb-8">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
            {{ getTitle(post) }}
          </h1>
          <div class="flex items-center justify-between text-gray-300">
            <div>
              <span class="text-sm">{{ formatDate(post.date) }}</span>
              <span class="mx-2">•</span>
              <span class="text-sm">{{ post.author }}</span>
            </div>
          </div>
        </div>

        <ContentRenderer :value="post.body || post" />

        <pre
          v-if="debugMode"
          class="mt-6 p-4 bg-black/40 text-xs text-white overflow-auto max-h-48"
          >{{ JSON.stringify(post.title, null, 2) }}</pre
        >

        <div class="mt-16 pt-8 border-t border-white/10">
          <div class="flex items-center justify-between gap-4">
            <div>
              <NuxtLink
                v-if="prevPost"
                :to="prevPost._path"
                class="inline-block px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                ← {{ getTitle(prevPost) }}
              </NuxtLink>
            </div>

            <div class="text-center">
              <NuxtLink
                to="/"
                class="inline-block px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                Back to Home
              </NuxtLink>
            </div>

            <div class="text-right">
              <NuxtLink
                v-if="nextPost"
                :to="nextPost._path"
                class="inline-block px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                {{ getTitle(nextPost) }} →
              </NuxtLink>
            </div>
          </div>
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
import { onMounted } from 'vue'

const route = useRoute()

const { data: post, error } = await useAsyncData(
  `blog-post-${route.params.slug}`,
  () => queryCollection('blog').path(`/blog/${route.params.slug}`).first()
)

// Fetch all posts to compute prev/next navigation
const { data: allPosts } = await useAsyncData('blog-posts-for-nav', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const postsList = allPosts.value || []
let currentIndex = postsList.findIndex(
  (p) => p._path === `/blog/${route.params.slug}`
)
if (currentIndex === -1) currentIndex = 0

const prevPost = postsList[currentIndex + 1] || null
const nextPost = postsList[currentIndex - 1] || null

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getTitle(post) {
  if (!post) return ''
  const t = post.title
  if (!t) return post.slug || post._id || 'Untitled'
  if (typeof t === 'string') return t

  // Safely extract string leaves from nested/circular objects
  const seen = new Set()
  function extract(obj) {
    if (obj == null) return null
    if (typeof obj === 'string') return obj
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)
    if (seen.has(obj)) return null
    seen.add(obj)
    if (typeof obj === 'object') {
      for (const key of ['title', 'text', 'value', 'raw', 'label']) {
        if (
          obj[key] &&
          (typeof obj[key] === 'string' || typeof obj[key] === 'number')
        )
          return String(obj[key])
      }
      if (Array.isArray(obj.children) && obj.children.length) {
        const parts = obj.children.map(extract).filter(Boolean)
        if (parts.length) return parts.join(' ')
      }
      for (const k of Object.keys(obj)) {
        const v = extract(obj[k])
        if (v) return v
      }
    }
    return null
  }

  if (Array.isArray(t)) {
    const parts = t.map(extract).filter(Boolean)
    if (parts.length) return parts.join(' ')
    return (
      t
        .map((x) =>
          typeof x === 'string' || typeof x === 'number' ? String(x) : ''
        )
        .filter(Boolean)
        .join(' ') ||
      post.slug ||
      post._id ||
      'Untitled'
    )
  }

  const res = extract(t)
  // Guard against the string "[object Object]" produced by naive coercion.
  if (res && String(res).trim() && String(res) !== '[object Object]') return res

  // Fallback: extract from the parsed body AST (find first heading/text node)
  function extractFromBody(body) {
    if (!body) return null
    const seenB = new Set()
    function walk(node) {
      if (!node || seenB.has(node)) return null
      seenB.add(node)
      if (typeof node === 'string') return node
      if (typeof node === 'object') {
        // headings may be represented as arrays or objects with type/name
        if (node.type && /h\d/.test(String(node.type))) {
          if (Array.isArray(node.children) && node.children.length) {
            const parts = node.children.map(extract).filter(Boolean)
            if (parts.length) return parts.join(' ')
          }
          if (node.value && typeof node.value === 'string') return node.value
        }
        if (Array.isArray(node)) {
          for (const child of node) {
            const v = walk(child)
            if (v) return v
          }
        }
        for (const k of Object.keys(node)) {
          const v = walk(node[k])
          if (v) return v
        }
      }
      return null
    }
    return walk(body)
  }

  const bodyTitle = extractFromBody(post.body || post)
  return bodyTitle || post.slug || post._id || 'Untitled'
}

const debugMode = import.meta.env.DEV

if (debugMode) {
  console.log('SSR post.title for', route.params.slug, post?.value?.title)
}

onMounted(() => {
  if (debugMode)
    console.log('Client post.title for', route.params.slug, post?.value?.title)
})
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
