<template>
  <header
    class="sticky top-0 z-40 backdrop-blur bg-black/50 border-b border-white/5"
  >
    <div class="max-w-6xl md:mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">
        <nav
          class="hidden md:flex items-center space-x-2"
          aria-label="Main navigation"
        >
          <a
            :href="route.name === 'index' ? '#home' : '/'"
            class="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Home</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'about'"
            class="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >About</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'portfolio'"
            class="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Portfolio</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'blog'"
            class="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Blog</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'contacts'"
            class="text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Contacts</a
          >
        </nav>

        <div class="md:hidden">
          <button
            @click="open = !open"
            :aria-expanded="open"
            aria-label="Toggle menu"
            class="p-2 rounded-md hover:bg-white/5"
          >
            <span class="sr-only">Open main menu</span>
            <div class="w-6 h-5 flex flex-col justify-between">
              <span
                :class="[
                  'block h-0.5 bg-current transition-transform',
                  open ? 'rotate-45 translate-y-1.5' : '',
                ]"
              ></span>
              <span
                :class="[
                  'block h-0.5 bg-current transition-opacity',
                  open ? 'opacity-0' : '',
                ]"
              ></span>
              <span
                :class="[
                  'block h-0.5 bg-current transition-transform',
                  open ? '-rotate-45 -translate-y-3' : '',
                ]"
              ></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="open"
        class="md:hidden border-t border-white/5 bg-black/60 flex"
      >
        <div class="px-4 py-3 space-y-1 w-full">
          <a
            :href="route.name === 'index' ? '#home' : '/'"
            class="block text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Home</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'about'"
            class="block text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >About</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'portfolio'"
            class="block text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Portfolio</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'blog'"
            class="block text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Blog</a
          >
          <a
            :href="(route.name === 'index' ? '#' : '/#') + 'contacts'"
            class="block text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
            >Contacts</a
          >
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
const open = ref(false)
const route = useRoute()

console.log(route.name)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
