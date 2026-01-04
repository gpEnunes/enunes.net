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

      <div>
        <div
          v-if="!postsList || postsList.length === 0"
          class="text-center py-8 text-gray-400"
        >
          <p>No posts available</p>
        </div>

        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="post in postsList"
            :key="post._path || post.slug"
            :to="getPostPath(post)"
            class="block group rounded-lg border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors"
          >
            <div class="p-6 flex flex-col h-full">
              <h3
                class="text-lg font-semibold text-white mb-2 group-hover:underline"
              >
                {{ getTitle(post) }}
              </h3>
              <p class="text-sm text-gray-300 mb-4 flex-1">
                {{ post.description || 'No description available.' }}
              </p>
              <div
                class="flex items-center justify-between text-xs text-gray-400"
              >
                <div>{{ formatDate(post.date) }}</div>
                <div>{{ post.author || '—' }}</div>
              </div>
            </div>
            <div class="p-4 border-t border-white/5 bg-white/2">
              <span
                class="inline-block text-sm text-sky-300 group-hover:text-sky-200 font-medium"
                >Read article →</span
              >
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, isRef, watch } from 'vue'

const props = defineProps({
  posts: {
    type: [Array, Object],
    default: () => [],
  },
})

// Normalize posts prop: it may be an Array or a Ref returned from useAsyncData
const postsList = computed(() => {
  if (!props.posts) return []
  if (isRef(props.posts)) return props.posts.value || []
  return Array.isArray(props.posts) ? props.posts : []
})

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getPostPath(post) {
  if (!post) return '/'
  if (post._path) return post._path
  if (post.path) return post.path
  if (post.slug) return `/blog/${post.slug}`
  if (post._id) return `/blog/${post._id}`
  return '/'
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
      // common keys
      for (const key of ['title', 'text', 'value', 'raw', 'label']) {
        if (
          obj[key] &&
          (typeof obj[key] === 'string' || typeof obj[key] === 'number')
        )
          return String(obj[key])
      }
      // children array
      if (Array.isArray(obj.children) && obj.children.length) {
        const parts = obj.children.map(extract).filter(Boolean)
        if (parts.length) return parts.join(' ')
      }
      // try object keys
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
    // fallback to joining primitive items safely
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
  return res || post.slug || post._id || 'Untitled'
}
</script>
