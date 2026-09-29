<script setup>
import { useReveal } from '../../composables/useReveal.js'
import { timeline } from '../../data/content.js'

const sectionRef = useReveal()
</script>

<template>
  <section ref="sectionRef" class="reveal relative min-h-screen px-6 py-24">
    <p class="text-rose-300 font-ui text-xs tracking-[0.2em] uppercase mb-4 text-center">— {{ timeline.eyebrow }} —</p>
    <h2 class="font-display text-4xl sm:text-5xl text-cream mb-20 text-center">{{ timeline.title }}</h2>

    <div class="relative max-w-3xl mx-auto">
      <!-- Glow Vertical Line -->
      <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-300/10 via-rose-300/30 to-rose-300/10 hidden sm:block"></div>

      <!-- Small Flower Decoration directly on the timeline axis line (matching screenshot) -->
      <div class="absolute left-1/2 -translate-x-1/2 top-[32%] text-base hidden sm:block z-10 select-none bg-wine-950 py-1">🌸</div>
      <div class="absolute left-1/2 -translate-x-1/2 top-[72%] text-base hidden sm:block z-10 select-none bg-wine-950 py-1">🌸</div>

      <div
        v-for="(item, i) in timeline.items"
        :key="i"
        class="relative mb-16 sm:w-1/2"
        :class="i % 2 === 0 ? 'sm:pr-12 sm:text-right sm:mr-auto' : 'sm:pl-12 sm:ml-auto'"
      >
        <!-- Timeline node dot with glow ring -->
        <span
          class="hidden sm:block absolute top-7 w-3.5 h-3.5 rounded-full bg-rose-300 ring-4 ring-rose-300/20 z-10"
          :class="i % 2 === 0 ? '-right-[7px]' : '-left-[7px]'"
        ></span>

        <div class="relative rounded-2xl bg-wine-800/40 border border-rose-300/10 px-6 py-6 hover:bg-wine-800/60 transition-colors duration-300">
          <!-- Flower decoration on card corners (matching screenshot) -->
          <div v-if="i === 0" class="absolute -top-2.5 -right-2 text-sm z-20 select-none">🌸</div>
          <div v-if="i === 2" class="absolute -top-2.5 -left-2 text-sm z-20 select-none">🌸</div>
          <div v-if="i === 4" class="absolute -top-2.5 -right-2 text-sm z-20 select-none">🌸</div>

          <div class="text-2xl mb-3">{{ item.icon }}</div>
          <p class="text-rose-300 font-ui text-[10px] tracking-[0.2em] uppercase mb-2">{{ item.tag }}</p>
          <h3 class="font-display text-xl text-cream mb-2">{{ item.title }}</h3>
          <p class="text-rose-100/70 font-accent text-sm leading-relaxed">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
