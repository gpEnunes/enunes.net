<template>
  <div>
    <Navbar />
    <Hero />
    <Demos />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Hero.vue'
import Demos from '~/components/Demos.vue'

// no page-level demo logic: moved into components/Demos.vue
</script>
