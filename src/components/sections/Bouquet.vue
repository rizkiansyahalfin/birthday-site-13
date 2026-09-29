<script setup>
import { ref } from 'vue'
import { useReveal } from '../../composables/useReveal.js'
import { bouquet } from '../../data/content.js'

const sectionRef = useReveal()
const activeMessage = ref(null)
const activeIndex = ref(null)
const particles = ref([])
let particleId = 0

function reveal(msg) {
  activeMessage.value = msg
}

function handleMouseEnter(f, i) {
  reveal(f.message)
  activeIndex.value = i
  spawnSparks(i)
}

function spawnSparks(index) {
  const flowerPos = positions[index % positions.length]
  const flowerTop = parseFloat(flowerPos.top)
  const flowerLeft = parseFloat(flowerPos.left)
  
  // A beautiful variety of small sparkles, flowers, and leaves
  const sparkEmojis = ['🌸', '✨', '💕', '🌷', '🌼', '🌺', '🍃', '💫']
  
  for (let i = 0; i < 10; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 14 + 6 // distance offset percentage
    const destX = Math.cos(angle) * distance
    const destY = Math.sin(angle) * distance
    
    const id = particleId++
    const p = {
      id,
      emoji: sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)],
      style: {
        position: 'absolute',
        top: flowerTop + '%',
        left: flowerLeft + '%',
        transform: 'translate(-50%, -50%)',
        fontSize: Math.random() * 6 + 10 + 'px', // random size between 10px and 16px
        pointerEvents: 'none',
        zIndex: 50,
        '--dx': destX + '%',
        '--dy': destY + '%',
      }
    }
    
    particles.value.push(p)
    
    setTimeout(() => {
      particles.value = particles.value.filter(item => item.id !== id)
    }, 800)
  }
}

// Positions matching the SVG stem endpoints (in percentage of parent relative container)
const positions = [
  { top: '8%', left: '46%' },    // Top-Center
  { top: '16%', left: '34%' },   // Top-Left
  { top: '16%', left: '57%' },   // Top-Right
  { top: '35%', left: '22%' },   // Mid-Left
  { top: '35%', left: '68%' },   // Mid-Right
  { top: '48%', left: '46%' },   // Center-Low
]
</script>

<template>
  <section id="bouquet" ref="sectionRef" class="reveal relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center select-none overflow-hidden">
    <p class="text-rose-300 font-ui text-xs tracking-[0.2em] uppercase mb-4">— {{ bouquet.eyebrow }} —</p>
    <h2 class="font-display text-4xl sm:text-5xl text-cream mb-3">{{ bouquet.title }}</h2>
    <p class="text-rose-200/60 font-accent italic mb-12">{{ bouquet.subtitle }}</p>

    <!-- Bouquet Container with aspect-ratio so absolute positioning and SVG line coordinates map correctly at any size -->
    <div class="relative w-full max-w-sm aspect-[4/3] mb-12">
      <!-- Stems and Ribbon SVG -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Leaves -->
        <path d="M78,92 Q68,90 73,83 Z" fill="#6A8E61" />
        <path d="M122,92 Q132,90 127,83 Z" fill="#6A8E61" />
        <path d="M68,75 Q58,78 65,70 Z" fill="#6A8E61" />
        <path d="M132,75 Q142,78 135,70 Z" fill="#6A8E61" />

        <!-- Stems -->
        <path d="M100,125 Q75,85 54,65" stroke="#6A8E61" stroke-width="2" stroke-linecap="round" />
        <path d="M100,125 Q82,75 75,38" stroke="#6A8E61" stroke-width="2" stroke-linecap="round" />
        <path d="M100,125 L100,25" stroke="#6A8E61" stroke-width="2" stroke-linecap="round" />
        <path d="M100,125 Q118,75 125,38" stroke="#6A8E61" stroke-width="2" stroke-linecap="round" />
        <path d="M100,125 Q125,85 146,65" stroke="#6A8E61" stroke-width="2" stroke-linecap="round" />
        <path d="M100,125 L100,85" stroke="#6A8E61" stroke-width="2" stroke-linecap="round" />

        <!-- Ribbon Bow at stem center -->
        <!-- Ribbon Tails -->
        <path d="M96,128 L88,144" stroke="#DC7FA3" stroke-width="2.5" stroke-linecap="round" />
        <path d="M104,128 L112,144" stroke="#DC7FA3" stroke-width="2.5" stroke-linecap="round" />
        <!-- Left Loop -->
        <ellipse cx="91" cy="125" rx="7" ry="5" fill="#DC7FA3" stroke="#2A0F20" stroke-width="1.2" transform="rotate(-15 91 125)" />
        <!-- Right Loop -->
        <ellipse cx="109" cy="125" rx="7" ry="5" fill="#DC7FA3" stroke="#2A0F20" stroke-width="1.2" transform="rotate(15 109 125)" />
        <!-- Center Knot -->
        <circle cx="100" cy="125" r="4.5" fill="#F4C2D7" stroke="#2A0F20" stroke-width="1.2" />
      </svg>

      <!-- Interactive Flower Emojis -->
      <button
        v-for="(f, i) in bouquet.flowers"
        :key="i"
        @mouseenter="handleMouseEnter(f, i)"
        @click="handleMouseEnter(f, i)"
        class="absolute text-4xl transition-all duration-300 z-10 w-12 h-12 flex items-center justify-center select-none cursor-pointer"
        :class="activeIndex === i ? 'scale-125 rotate-6 active-flower' : 'hover:scale-115 hover:rotate-6 opacity-75 hover:opacity-100'"
        :style="positions[i % positions.length]"
        :aria-label="'Reveal message ' + (i + 1)"
      >
        <!-- Glowing background aura for active flower -->
        <span 
          v-if="activeIndex === i" 
          class="absolute w-12 h-12 rounded-full bg-rose-300/20 blur-[6px] animate-pulse-fast pointer-events-none"
        ></span>
        <span class="relative z-10">{{ f.emoji }}</span>
      </button>

      <!-- Spawned Sparkle Particles -->
      <span
        v-for="p in particles"
        :key="p.id"
        class="spark-particle select-none"
        :style="p.style"
      >
        {{ p.emoji }}
      </span>
    </div>

    <!-- Message Reveal Box (Glassmorphic) -->
    <div class="min-h-[4.5rem] max-w-sm w-full mx-auto px-6 py-4 rounded-2xl bg-wine-800/40 backdrop-blur-sm border border-rose-300/10 font-accent italic text-rose-100/90 flex items-center justify-center transition-all duration-300">
      {{ activeMessage || bouquet.hint }}
    </div>
  </section>
</template>

<style scoped>
.spark-particle {
  animation: spark-fly 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes spark-fly {
  0% {
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.2) rotate(120deg);
    opacity: 0;
  }
}

.active-flower {
  filter: drop-shadow(0 0 10px rgba(239, 175, 201, 0.95)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.7));
}

@keyframes pulse-fast {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.25); opacity: 0.95; }
}

.animate-pulse-fast {
  animation: pulse-fast 1.6s ease-in-out infinite;
}
</style>
