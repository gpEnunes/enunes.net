<template>
  <div>
    <Navbar />
    <Hero />
    <About />
    <Portfolio />
    <Blog :posts="jsonPosts" />
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

// Ensure we pass a plain serializable array (no Proxy) to the Blog component
const jsonPosts = JSON.parse(JSON.stringify(posts?.value || []))
</script>
