<script setup>
import { ref } from 'vue'
import { useReveal } from '../../composables/useReveal.js'
import { gratitudeJar } from '../../data/content.js'

const sectionRef = useReveal()
const currentNote = ref(null)
const shaking = ref(false)
const particles = ref([])
let particleId = 0

function shakeJar() {
  if (shaking.value) return
  shaking.value = true
  
  // Spawn floating heart sparkles
  spawnSparks()
  
  setTimeout(() => {
    const pool = gratitudeJar.notes.filter((n) => n !== currentNote.value)
    currentNote.value = pool[Math.floor(Math.random() * pool.length)]
    shaking.value = false
  }, 500)
}

function spawnSparks() {
  const sparkEmojis = ['💕', '💖', '💝', '✨', '🌸', '💫', '💘', '🎈']
  
  for (let i = 0; i < 12; i++) {
    // Generate flight vector angled upwards (spread semi-circle)
    const angle = -Math.PI * Math.random() - 0.2
    const distance = Math.random() * 80 + 40 // distance in pixels
    const destX = Math.cos(angle) * distance
    const destY = Math.sin(angle) * distance
    
    const id = particleId++
    const p = {
      id,
      emoji: sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)],
      style: {
        position: 'absolute',
        top: '15%', // origin around the lid of the jar
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: Math.random() * 8 + 14 + 'px', // sizes between 14px and 22px
        pointerEvents: 'none',
        zIndex: 50,
        '--dx': destX + 'px',
        '--dy': destY + 'px',
      }
    }
    
    particles.value.push(p)
    
    setTimeout(() => {
      particles.value = particles.value.filter(item => item.id !== id)
    }, 1200)
  }
}
</script>

<template>
  <section ref="sectionRef" class="reveal relative min-h-screen flex flex-col items-center px-6 py-24 text-center">
    <p class="text-rose-300 font-ui text-xs tracking-[0.2em] uppercase mb-4">— {{ gratitudeJar.eyebrow }} —</p>
    <h2 class="font-display text-4xl sm:text-5xl text-cream mb-3 max-w-2xl">{{ gratitudeJar.title }}</h2>
    <p class="text-rose-200/60 font-accent italic mb-16">{{ gratitudeJar.hint }}</p>

    <!-- Detailed SVG Glass Jar with Floating Notes -->
    <div
      class="relative w-36 h-60 mb-10 cursor-pointer select-none"
      :class="shaking ? 'animate-shake' : 'hover:scale-105 transition-transform duration-300'"
      @click="shakeJar"
      aria-label="Shake the jar"
    >
      <svg class="w-full h-full" viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Pink Lid -->
        <rect x="25" y="10" width="50" height="12" rx="4" fill="#DC7FA3" stroke="#2A0F20" stroke-width="1.8" />
        <rect x="22" y="7" width="56" height="4" rx="2" fill="#E899B8" stroke="#2A0F20" stroke-width="1.8" />

        <!-- Jar Body Glass -->
        <path d="M22,22 L78,22 Q83,22 83,27 L83,143 Q83,153 73,153 L27,153 Q17,153 17,143 L17,27 Q17,22 22,22 Z" fill="rgba(244, 194, 215, 0.08)" stroke="#EFAFC9" stroke-width="2.5" stroke-linejoin="round" />
        
        <!-- Glass reflections -->
        <path d="M24,28 Q24,25 27,25 L35,25" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
        <path d="M77,32 L77,138" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.15" />
        <path d="M23,32 L23,138" stroke="#EFAFC9" stroke-width="1" opacity="0.3" />

        <!-- Tilted Notes inside the Jar -->
        <g class="notes-inside">
          <rect x="28" y="45" width="16" height="10" rx="1.5" fill="#EFAFC9" opacity="0.75" transform="rotate(-15 36 50)" stroke="#2A0F20" stroke-width="0.8" />
          <rect x="54" y="48" width="16" height="10" rx="1.5" fill="#F4C2D7" opacity="0.8" transform="rotate(25 62 53)" stroke="#2A0F20" stroke-width="0.8" />
          <rect x="34" y="70" width="16" height="10" rx="1.5" fill="#FBF3EE" opacity="0.9" transform="rotate(10 42 75)" stroke="#2A0F20" stroke-width="0.8" />
          <rect x="56" y="78" width="16" height="10" rx="1.5" fill="#EFAFC9" opacity="0.75" transform="rotate(-30 64 83)" stroke="#2A0F20" stroke-width="0.8" />
          <rect x="30" y="102" width="16" height="10" rx="1.5" fill="#F4C2D7" opacity="0.8" transform="rotate(-5 38 107)" stroke="#2A0F20" stroke-width="0.8" />
          <rect x="54" y="105" width="16" height="10" rx="1.5" fill="#FBF3EE" opacity="0.9" transform="rotate(15 62 110)" stroke="#2A0F20" stroke-width="0.8" />
          <rect x="42" y="128" width="16" height="10" rx="1.5" fill="#EFAFC9" opacity="0.75" transform="rotate(-20 50 133)" stroke="#2A0F20" stroke-width="0.8" />
        </g>
      </svg>

      <!-- Spawned Sparkle/Heart Particles -->
      <span
        v-for="p in particles"
        :key="p.id"
        class="spark-particle select-none"
        :style="p.style"
      >
        {{ p.emoji }}
      </span>
    </div>

    <!-- Shake the Jar Button -->
    <button
      @click="shakeJar"
      class="px-8 py-3 rounded-full bg-rose-300/20 hover:bg-rose-300/30 border border-rose-300/30 text-rose-100 font-ui text-sm tracking-wide transition-colors mb-10 select-none cursor-pointer"
    >
      {{ gratitudeJar.buttonLabel }}
    </button>

    <!-- Revealed Note Message (Now situated below the button) -->
    <transition name="fade" mode="out-in">
      <div
        v-if="currentNote"
        :key="currentNote"
        class="max-w-md px-6 py-5 rounded-2xl bg-blush text-wine-900 font-accent italic shadow-soft"
      >
        {{ currentNote }}
      </div>
    </transition>
  </section>
</template>

<style scoped>
.animate-shake {
  animation: shakejar 0.5s ease-in-out;
  transform-origin: bottom center;
}

@keyframes shakejar {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-8deg); }
  40% { transform: rotate(8deg); }
  60% { transform: rotate(-6deg); }
  80% { transform: rotate(6deg); }
}

.spark-particle {
  animation: spark-float 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes spark-float {
  0% {
    transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy) - 40px)) scale(1.3) rotate(360deg);
    opacity: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
