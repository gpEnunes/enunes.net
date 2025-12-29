import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {},
  $env: {
    staging: {}
  },
  css: ['~/assets/css/tailwind.css'],
  typescript: { shim: false },
  components: true,
  ssr: true
})
