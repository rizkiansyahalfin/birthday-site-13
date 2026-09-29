<script setup>
import { ref } from 'vue'
import { giftRevealPhotos } from '../../data/content.js'

const emit = defineEmits(['opened'])
const opening = ref(false)
const showEnterButton = ref(false)

function openGift() {
  if (opening.value) return
  opening.value = true
  // Show the "Enter" button after 3.2 seconds, once the heart has fully settled
  setTimeout(() => {
    showEnterButton.value = true
  }, 3200)
}

function enterSite() {
  emit('opened')
}

// Photo configurations from content.js (forming a symmetrical heart shape)
const lovePhotos = giftRevealPhotos

// 12 main rays and 12 background rays with staggered delay and duration offsets
const rays = [
  // Main Rays
  { id: 1, angle: 0, delay: 0.0, duration: 0.9, width: 4.5 },
  { id: 2, angle: 30, delay: 0.35, duration: 0.75, width: 4.5 },
  { id: 3, angle: 60, delay: 0.15, duration: 0.85, width: 4.5 },
  { id: 4, angle: 90, delay: 0.5, duration: 0.7, width: 4.5 },
  { id: 5, angle: 120, delay: 0.1, duration: 0.95, width: 4.5 },
  { id: 6, angle: 150, delay: 0.4, duration: 0.8, width: 4.5 },
  { id: 7, angle: 180, delay: 0.05, duration: 0.9, width: 4.5 },
  { id: 8, angle: 210, delay: 0.3, duration: 0.85, width: 4.5 },
  { id: 9, angle: 240, delay: 0.2, duration: 0.9, width: 4.5 },
  { id: 10, angle: 270, delay: 0.55, duration: 0.75, width: 4.5 },
  { id: 11, angle: 300, delay: 0.08, duration: 0.95, width: 4.5 },
  { id: 12, angle: 330, delay: 0.35, duration: 0.8, width: 4.5 },

  // Filler / Background Rays
  { id: 13, angle: 15, delay: 0.6, duration: 1.1, width: 1.5 },
  { id: 14, angle: 45, delay: 0.7, duration: 1.0, width: 1.5 },
  { id: 15, angle: 75, delay: 0.5, duration: 1.2, width: 1.5 },
  { id: 16, angle: 105, delay: 0.8, duration: 0.9, width: 1.5 },
  { id: 17, angle: 135, delay: 0.65, duration: 1.1, width: 1.5 },
  { id: 18, angle: 165, delay: 0.75, duration: 1.0, width: 1.5 },
  { id: 19, angle: 195, delay: 0.55, duration: 1.25, width: 1.5 },
  { id: 20, angle: 225, delay: 0.85, duration: 0.95, width: 1.5 },
  { id: 21, angle: 255, delay: 0.6, duration: 1.1, width: 1.5 },
  { id: 22, angle: 285, delay: 0.7, duration: 1.05, width: 1.5 },
  { id: 23, angle: 315, delay: 0.9, duration: 1.0, width: 1.5 },
  { id: 24, angle: 345, delay: 0.75, duration: 1.15, width: 1.5 },
]
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-wine-gradient">
    <!-- Top info text transitions dynamically -->
    <p class="text-rose-200/70 font-ui text-sm mb-12 tracking-wide transition-opacity duration-300 z-10" :class="{ 'opacity-0': showEnterButton }">
      {{ opening ? '✨ Hati-hati berhamburan... ✨' : 'Ketuk kado untuk membukanya 🎁' }}
    </p>

    <!-- Light rays and aura elements behind the box -->
    <div
      v-if="opening"
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 animate-fade-in"
    >
      <!-- Radial Aura Glow -->
      <div
        class="absolute w-[300px] h-[300px] rounded-full animate-pulse-fast"
        style="background: radial-gradient(circle, rgba(249, 208, 87, 0.4) 0%, rgba(93, 161, 109, 0.18) 50%, transparent 70%);"
      ></div>

      <!-- Golden Light Rays (spinning slowly) -->
      <svg class="absolute w-[600px] h-[600px] animate-spin-slow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ray-grad" x1="100" y1="100" x2="100" y2="0">
            <stop offset="0%" stop-color="#FAF7F2" stop-opacity="1" />
            <stop offset="25%" stop-color="#F9D057" stop-opacity="0.8" />
            <stop offset="65%" stop-color="#5DA16D" stop-opacity="0.25" />
            <stop offset="100%" stop-color="transparent" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g stroke="url(#ray-grad)" stroke-linecap="round">
          <line
            v-for="r in rays"
            :key="r.id"
            x1="100"
            y1="100"
            x2="100"
            y2="10"
            :stroke-width="r.width"
            :transform="'rotate(' + r.angle + ' 100 100)'"
            class="ray-line"
            :style="{
              animationDelay: r.delay + 's',
              animationDuration: r.duration + 's'
            }"
          />
        </g>
      </svg>

      <!-- Sparkles / Star particles around the box -->
      <div class="absolute w-2 h-2 rounded-full bg-[#F9D057] animate-ping opacity-80" style="top: 36%; left: 34%;"></div>
      <div class="absolute w-1.5 h-1.5 rounded-full bg-[#FAF7F2] animate-pulse" style="top: 40%; left: 66%;"></div>
      <div class="absolute w-2 h-2 rounded-full bg-[#A2CCA7] animate-ping opacity-70" style="top: 56%; left: 28%;"></div>
      <div class="absolute w-1.5 h-1.5 rounded-full bg-[#FAF7F2] animate-pulse" style="top: 64%; left: 62%;"></div>
      <div class="absolute w-2 h-2 rounded-full bg-[#F9D057] animate-pulse" style="top: 28%; left: 52%;"></div>
      <div class="absolute w-2 h-2 rounded-full bg-[#A2CCA7] animate-ping opacity-75" style="top: 68%; left: 45%;"></div>
    </div>

    <!-- Gift Box container wrapper -->
    <div
      @click="openGift"
      class="gift-container w-44 h-44 cursor-pointer select-none relative z-10"
      :class="{ 'opening': opening, 'fade-out-gift': showEnterButton }"
      aria-label="Open gift"
    >
      <svg viewBox="0 0 120 120" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Bow -->
        <g class="gift-bow">
          <path d="M60,35 C52,20 38,28 50,35 Z" fill="#E6C587" stroke="#14221A" stroke-width="1.8" stroke-linejoin="round" />
          <path d="M60,35 C68,20 82,28 70,35 Z" fill="#E6C587" stroke="#14221A" stroke-width="1.8" stroke-linejoin="round" />
          <circle cx="60" cy="35" r="5" fill="#D3A756" stroke="#14221A" stroke-width="1.8" />
        </g>
        <!-- Lid -->
        <g class="gift-lid">
          <rect x="25" y="38" width="70" height="13" rx="3" fill="#7FB988" stroke="#14221A" stroke-width="2.2" />
          <rect x="25" y="43" width="70" height="3" fill="#E6C587" />
          <rect x="56" y="38" width="8" height="13" fill="#E6C587" stroke="#14221A" stroke-width="1.8" />
        </g>
        <!-- Box Base -->
        <g class="gift-base">
          <path d="M30,51 L90,51 L85,95 Q85,100 80,100 L40,100 Q35,100 35,95 Z" fill="#5DA16D" stroke="#14221A" stroke-width="2.2" />
          <rect x="56" y="51" width="8" height="49" fill="#E6C587" stroke="#14221A" stroke-width="1.8" />
        </g>
      </svg>
    </div>

    <!-- Heart of Photos (revealed when opened) -->
    <div v-if="opening" class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <div
        v-for="(photo, i) in lovePhotos"
        :key="i"
        class="love-polaroid absolute bg-cream p-1 pb-3 sm:p-1.5 sm:pb-4 shadow-soft border border-rose-300/10 pointer-events-auto"
        :style="{
          '--dx': photo.dx + 'px',
          '--dy': photo.dy + 'px',
          '--rot': photo.rotate + 'deg',
          animationDelay: `${i * 120}ms`
        }"
      >
        <div class="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] overflow-hidden bg-wine-800/10 rounded-sm">
          <img :src="photo.src" decoding="async" class="w-full h-full object-cover" alt="Memory" />
        </div>
      </div>
    </div>

    <!-- Enter Main Surprise Button -->
    <transition name="fade">
      <button
        v-if="showEnterButton"
        @click="enterSite"
        class="fixed bottom-12 px-10 py-4 rounded-full bg-[#5DA16D] hover:bg-[#4B8E6C] border-2 border-wine-950/20 text-white font-ui text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-soft-large z-30 animate-bounce-gentle"
      >
        Buka Kejutan Utama 🔓
      </button>
    </transition>
  </div>
</template>

<style scoped>
.gift-container {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease;
}
.gift-container:hover {
  transform: scale(1.08) rotate(2deg);
}
.gift-container:active {
  transform: scale(0.96);
}

.gift-lid, .gift-bow, .gift-base {
  transform-origin: 50% 50%;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Unwrap animations */
.opening .gift-lid {
  transform: translateY(-24px) rotate(8deg);
}
.opening .gift-bow {
  transform: translateY(-24px) rotate(8deg);
}
.opening .gift-base {
  transform: scale(1.05);
}

.fade-out-gift {
  opacity: 0.15;
  transform: scale(0.85);
  pointer-events: none;
}

/* Polaroids floating in a heart shape */
.love-polaroid {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 58px;
  height: 72px;
  opacity: 0;
  --scale: 0.65;
  animation: fly-to-heart 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), z-index 0s;
  will-change: transform, opacity;
}

.love-polaroid:hover {
  transform: translate(calc(-50% + (var(--dx) * var(--scale))), calc(-50% + (var(--dy) * var(--scale)))) rotate(0deg) scale(1.3) !important;
  z-index: 50 !important;
}

@media (min-width: 640px) {
  .love-polaroid {
    width: 92px;
    height: 114px;
    --scale: 1;
  }
}

@keyframes fly-to-heart {
  0% {
    transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + (var(--dx) * var(--scale))), calc(-50% + (var(--dy) * var(--scale)))) rotate(var(--rot));
    opacity: 1;
  }
}

/* Fade in animation for rays container */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

/* Staggered ray growth animation */
.ray-line {
  stroke-dasharray: 90;
  stroke-dashoffset: 90;
  transform-origin: 100px 100px;
  animation: ray-grow cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes ray-grow {
  0% {
    stroke-dashoffset: 90;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.85;
  }
}

/* Pulsing for the inner radial aura */
@keyframes pulse-fast {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}
.animate-pulse-fast {
  animation: pulse-fast 1.2s ease-in-out infinite;
}

/* Slow rotation for light rays */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Bouncing enter button */
@keyframes bounceGentle {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.02); }
}
.animate-bounce-gentle {
  animation: bounceGentle 2s ease-in-out infinite;
}

/* Button transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
