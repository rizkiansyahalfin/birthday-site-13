<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import FloatingFlowers from '../FloatingFlowers.vue'
import { hero, profile } from '../../data/content.js'

const activeIndex = ref(0)
const typedText = ref('')
let intervalId
let typingTimeout = null

onMounted(() => {
  startTyping()
  // Run loop to switch text every 4.5 seconds (gives plenty of time to type and read)
  intervalId = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % hero.subtitles.length
  }, 4500)
})

onUnmounted(() => {
  clearInterval(intervalId)
  if (typingTimeout) clearInterval(typingTimeout)
})

// Watch for activeIndex change to re-trigger typewriter effect
watch(activeIndex, () => {
  startTyping()
})

function startTyping() {
  const fullText = hero.subtitles[activeIndex.value]
  let charIndex = 0
  typedText.value = ''
  
  if (typingTimeout) {
    clearInterval(typingTimeout)
  }
  
  // Type one character every 60ms
  typingTimeout = setInterval(() => {
    if (charIndex < fullText.length) {
      typedText.value += fullText[charIndex]
      charIndex++
    } else {
      clearInterval(typingTimeout)
      typingTimeout = null
    }
  }, 60)
}

function scrollToNext() {
  const next = document.getElementById('bouquet')
  next?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
    <FloatingFlowers :count="16" />

    <p class="relative z-10 text-rose-300 font-ui text-sm tracking-[0.2em] uppercase mb-6">
      🌸 {{ hero.eyebrow }} 🌸
    </p>

    <h1 class="relative z-10 font-display text-cream leading-[1.05]">
      <span class="block text-5xl sm:text-6xl md:text-7xl font-display font-medium tracking-wide">{{ hero.titleLine1 }}</span>
      <span class="block italic text-rose-300 font-accent text-6xl sm:text-7xl md:text-8xl my-2">{{ hero.titleLine2Accent }}</span>
      <span class="block text-5xl sm:text-6xl md:text-7xl font-display font-medium tracking-wide mt-2">{{ hero.titleLine3 }}</span>
    </h1>

    <!-- Typewriter text with blinking cursor -->
    <p class="relative z-10 italic text-rose-100/80 font-accent text-lg sm:text-xl mt-10 min-h-[4rem] sm:min-h-[3rem] px-4 max-w-xl mx-auto flex items-center justify-center">
      <span>{{ typedText }}</span>
      <span class="inline-block w-[2px] h-[1.2em] ml-1.5 bg-rose-300/80 animate-blink"></span>
    </p>

    <div class="relative z-10 divider my-6"></div>

    <p class="relative z-10 text-rose-200/50 font-ui text-xs tracking-[0.15em] uppercase">
      {{ profile.specialDateShort }} · {{ hero.specialDateLabel || 'The Most Special Day' }}
    </p>

    <button
      @click="scrollToNext"
      class="relative z-10 mt-16 flex flex-col items-center gap-2 text-rose-200/50 hover:text-rose-200 transition-colors font-ui text-[10px] tracking-[0.25em] uppercase"
    >
      <svg class="w-5 h-5 animate-bounce text-rose-200/60" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
      </svg>
      <span>Scroll</span>
    </button>
  </section>
</template>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.animate-blink {
  animation: blink 0.8s step-end infinite;
}
</style>
