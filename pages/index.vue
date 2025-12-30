<template>
  <div>
    <Navbar />
    <Hero />
    <About />
    <Portfolio />
    <Blog :posts="posts" />
    <Contacts />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Hero.vue'
import About from '~/components/About.vue'
import Portfolio from '~/components/Portfolio.vue'
import Blog from '~/components/Blog.vue'
import Contacts from '~/components/Contacts.vue'

// Fetch posts using @nuxt/content collection API
const { data: posts, error } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

console.log('🔍 DEBUG index.vue - posts (from queryCollection):', posts.value)
console.log('🔍 DEBUG index.vue - error:', error.value)
</script>
