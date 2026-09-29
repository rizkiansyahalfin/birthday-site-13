<script setup>
import { useReveal } from '../../composables/useReveal.js'
import { letter } from '../../data/content.js'

const sectionRef = useReveal()
</script>

<template>
  <section ref="sectionRef" class="reveal relative min-h-screen flex flex-col items-center px-6 py-24">
    <p class="text-rose-300 font-ui text-xs tracking-[0.2em] uppercase mb-4">— {{ letter.eyebrow }} —</p>
    <h2 class="font-display text-4xl sm:text-5xl text-cream mb-12 text-center">{{ letter.title }}</h2>

    <div
      class="relative w-full max-w-2xl rounded-2xl text-wine-900 shadow-soft px-8 sm:px-12 py-10 sm:py-14 overflow-hidden bg-cover bg-center"
      style="background-image: linear-gradient(rgba(251, 243, 238, 0.8), rgba(251, 243, 238, 0.8)), url('/photos/letter-bg.jpg');"
    >
      <!-- Decorative Corner Flowers -->
      <div class="absolute top-5 left-6 text-rose-300/30 text-base select-none pointer-events-none">🌸 ✦ 🌸</div>
      <div class="absolute top-5 right-6 text-rose-300/30 text-base select-none pointer-events-none">🌸 ✦ 🌸</div>

      <div class="text-center mb-6">
        <p class="text-rose-500 text-sm">🌸 ✦ 🌸</p>
        <p class="text-wine-700/60 italic font-accent text-sm mt-2">{{ letter.date }}</p>
      </div>

      <div class="divider mx-auto !bg-wine-700/30 mb-8"></div>

      <p class="font-accent text-lg mb-6">{{ letter.greeting }}</p>

      <p v-for="(p, i) in letter.paragraphs" :key="i" class="font-accent text-base sm:text-lg leading-relaxed mb-5 text-wine-800/90">
        {{ p }}
      </p>

      <p v-if="letter.italicParagraph" class="font-accent italic font-semibold text-lg sm:text-xl leading-relaxed mb-6 text-rose-500 tracking-wide">
        {{ letter.italicParagraph }}
      </p>

      <p v-if="letter.closingParagraph" class="font-accent text-base sm:text-lg leading-relaxed mb-8 text-wine-800/90">
        {{ letter.closingParagraph }}
      </p>

      <div v-if="letter.ps" class="rounded-lg bg-blush px-5 py-4 font-accent italic text-rose-600 text-sm mb-8">
        {{ letter.ps }}
      </div>

      <div class="text-right flex flex-col items-end">
        <p class="font-accent italic text-wine-700/70 text-sm">{{ letter.signOff }}</p>
        <p class="font-display text-2xl text-wine-900 mt-1">{{ letter.signature }}</p>
        <!-- Tilting pink hearts matching screenshot -->
        <span class="text-xl text-rose-400 mt-1.5 transform rotate-12 select-none">💕</span>
      </div>
    </div>
  </section>
</template>
