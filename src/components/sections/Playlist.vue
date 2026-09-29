<script setup>
import { computed } from 'vue'
import { useReveal } from '../../composables/useReveal.js'
import { playlist } from '../../data/content.js'
import { useAudio } from '../../composables/useAudio.js'

const sectionRef = useReveal()

const {
  isPlaying,
  currentIndex,
  currentTime,
  duration,
  isWaiting,
  currentTrack,
  togglePlay,
  selectTrack,
  next,
  prev,
  seek
} = useAudio()

const progressPercent = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0
)

function handleSeek(e) {
  const ratio = e.target.value / 100
  seek(ratio)
}

function formatTime(t) {
  if (!t || Number.isNaN(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<template>
  <section ref="sectionRef" class="reveal relative min-h-screen flex flex-col items-center px-6 py-24">
    <p class="text-rose-300 font-ui text-xs tracking-[0.2em] uppercase mb-4">— {{ playlist.eyebrow }} —</p>
    <h2 class="font-display text-4xl sm:text-5xl text-cream mb-3 text-center">{{ playlist.title }}</h2>
    <p class="text-rose-200/60 font-accent italic mb-12 text-center">{{ playlist.subtitle }}</p>

    <div class="w-full max-w-md rounded-3xl bg-wine-800/40 backdrop-blur-sm border border-rose-300/10 px-8 py-10 mb-6 shadow-soft">
      <!-- Premium Turntable Container with Needle Arm -->
      <div class="flex justify-center mb-8 relative w-full h-36 items-center">
        <!-- Vinyl Record Disk -->
        <div
          class="w-36 h-36 rounded-full bg-[#1A0610] border-[6px] border-[#3D1A2E]/60 flex items-center justify-center relative shadow-2xl overflow-hidden select-none transition-transform duration-500"
          :class="isPlaying ? 'animate-spin-slow' : ''"
        >
          <!-- Vinyl groove circles -->
          <div class="absolute inset-2 rounded-full border border-black/20"></div>
          <div class="absolute inset-4 rounded-full border border-black/25"></div>
          <div class="absolute inset-6 rounded-full border border-black/30"></div>
          <div class="absolute inset-8 rounded-full border border-black/35"></div>
          <div class="absolute inset-10 rounded-full border border-black/40"></div>
          
          <!-- Vinyl shine reflections (glass-like highlights) -->
          <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-80 pointer-events-none"></div>
          <div class="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-transparent opacity-80 pointer-events-none"></div>

          <!-- Pink Record Center Label -->
          <div class="w-12 h-12 rounded-full bg-[#DC7FA3] flex items-center justify-center border border-[#2A0F20]/30 shadow-inner relative z-10">
            <!-- Center Spindle Hole -->
            <div class="w-3.5 h-3.5 rounded-full bg-[#FBF3EE] shadow-md border border-black/10"></div>
          </div>
          
          <!-- Buffering / Loading Ring Overlay -->
          <div 
            v-if="isWaiting"
            class="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] z-20"
          >
            <div class="w-8 h-8 rounded-full border-2 border-rose-300 border-t-transparent animate-spin"></div>
          </div>
        </div>

        <!-- Turntable Arm/Needle (Jarum pemutar) -->
        <div 
          class="absolute top-0 right-[26%] w-12 h-24 origin-top-right transition-transform duration-700 ease-out pointer-events-none z-20"
          :style="{ transform: isPlaying ? 'rotate(-8deg)' : 'rotate(-42deg)' }"
        >
          <!-- SVG Turntable Arm -->
          <svg viewBox="0 0 40 80" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Pivot Mount (Baut/Kop) -->
            <circle cx="30" cy="10" r="7" fill="#4A2238" stroke="#EFAFC9" stroke-width="1.5" />
            <circle cx="30" cy="10" r="3" fill="#FBF3EE" />
            
            <!-- Metallic arm stem -->
            <path d="M30,10 L15,50 L12,68" stroke="#F4C2D7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            
            <!-- Cartridge/Head (Kepala Jarum) -->
            <rect x="7" y="66" width="10" height="6" rx="1.5" fill="#4A2238" stroke="#EFAFC9" stroke-width="1.2" transform="rotate(-15 12 69)" />
            <line x1="8" y1="71" x2="4" y2="73" stroke="#FBF3EE" stroke-width="1.2" /> <!-- Needle tip -->
          </svg>
        </div>
      </div>

      <p class="font-display text-2xl text-cream text-center mb-1">{{ currentTrack.title }}</p>
      <p class="text-rose-200/60 text-center font-ui text-sm mb-6">{{ currentTrack.artist }}</p>

      <input
        type="range"
        min="0"
        max="100"
        :value="progressPercent"
        @input="handleSeek"
        class="w-full accent-rose-300 mb-2 cursor-pointer"
      />
      <div class="flex justify-between text-xs text-rose-200/50 font-ui mb-6">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>

      <!-- Playback Controls using clean SVGs -->
      <div class="flex items-center justify-center gap-8">
        <!-- Previous Track Button -->
        <button @click="prev" class="text-rose-200/70 hover:text-rose-100 transition-colors w-6 h-6 flex items-center justify-center cursor-pointer" aria-label="Previous">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <!-- Play/Pause Button -->
        <button
          @click="togglePlay"
          class="w-14 h-14 rounded-full bg-rose-300/10 hover:bg-rose-300/20 border border-rose-300/20 flex items-center justify-center text-rose-100 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          :aria-label="isPlaying ? 'Pause' : 'Play'"
        >
          <svg v-if="isPlaying" class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
          <svg v-else class="w-6 h-6 fill-current translate-x-[1px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>

        <!-- Next Track Button -->
        <button @click="next" class="text-rose-200/70 hover:text-rose-100 transition-colors w-6 h-6 flex items-center justify-center cursor-pointer" aria-label="Next">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="w-full max-w-md space-y-3">
      <button
        v-for="(t, i) in playlist.tracks"
        :key="i"
        @click="selectTrack(i)"
        class="w-full flex items-center justify-between rounded-xl px-5 py-4 transition-colors text-left cursor-pointer"
        :class="i === currentIndex ? 'bg-wine-700/60' : 'bg-wine-800/40 hover:bg-wine-800/60'"
      >
        <div class="flex items-center gap-4">
          <span class="text-rose-200/40 font-ui text-sm w-4">{{ i + 1 }}</span>
          <div>
            <p class="text-cream font-accent">{{ t.title }}</p>
            <p class="text-rose-200/50 font-ui text-xs">{{ t.artist }}</p>
          </div>
        </div>
        <span class="text-rose-300">♪</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 6s linear infinite;
}
</style>
