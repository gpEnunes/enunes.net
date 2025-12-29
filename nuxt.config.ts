import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  typescript: { shim: false },
  components: true,
  ssr: true
})
