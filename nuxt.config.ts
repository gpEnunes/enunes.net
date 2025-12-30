import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-12-29',
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {},
  $env: {
    staging: {}
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap' }
      ]
    }
  },
  css: ['~/assets/css/theme.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  typescript: { shim: false },
  components: true,
  ssr: true
})
