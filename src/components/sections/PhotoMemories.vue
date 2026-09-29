<script setup>
import { ref, computed } from 'vue'
import { useReveal } from '../../composables/useReveal.js'
import { photoMemories } from '../../data/content.js'

const sectionRef = useReveal()
const failed = ref({})
const flipped = ref({})
const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'Semua 📸' },
  { id: 'smile', name: 'Senyum Manis 🌸' },
  { id: 'gemas', name: 'Muka Gemas 🤏🏻' },
  { id: 'special', name: 'Potret Spesial ✨' },
]

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all') {
    return photoMemories.photos
  }
  return photoMemories.photos.filter(photo => photo.category === activeCategory.value)
})

function onImgError(src) {
  failed.value[src] = true
}

function toggleFlip(src) {
  flipped.value[src] = !flipped.value[src]
}

// Slight alternating tilt for a hand-placed polaroid feel
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
</script>

<template>
  <section ref="sectionRef" class="reveal relative min-h-screen flex flex-col items-center px-6 py-24">
    <p class="text-rose-300 font-ui text-xs tracking-[0.2em] uppercase mb-4">— {{ photoMemories.eyebrow }} —</p>
    <h2 class="font-display text-4xl sm:text-5xl text-cream mb-3 text-center">{{ photoMemories.title }}</h2>
    <p class="text-rose-200/60 font-accent italic mb-8 text-center">{{ photoMemories.subtitle }}</p>

    <!-- Category Selector Tabs -->
    <div class="flex flex-wrap justify-center gap-3 mb-16 max-w-xl z-10">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="activeCategory = cat.id"
        class="px-5 py-2.5 rounded-full text-sm font-ui border transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
        :class="activeCategory === cat.id
          ? 'bg-rose-300 text-wine-900 border-rose-300 font-semibold shadow-rose-300/25'
          : 'bg-wine-800/40 text-rose-200/70 border-rose-300/10 hover:text-rose-100 hover:bg-wine-800/60'"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="filteredPhotos.length === 0" class="text-rose-200/50 italic py-12 text-center">
      Belum ada foto di kategori ini... 🌸
    </div>

    <div class="flex flex-wrap justify-center gap-8 max-w-4xl">
      <!-- 3D Perspective Polaroid Wrapper -->
      <div
        v-for="(photo, i) in filteredPhotos"
        :key="photo.src"
        class="polaroid-wrapper relative w-64 h-[340px] cursor-pointer select-none transition-all duration-500 hover:scale-105 hover:rotate-0"
        :class="tilts[i % tilts.length]"
        @click="toggleFlip(photo.src)"
      >
        <!-- Polaroid Adhesive Tape sitting over the top border -->
        <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#ebdbb2]/50 backdrop-blur-[1px] rotate-[-2deg] border border-[#d5c4a1]/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-30 pointer-events-none"></span>

        <!-- Card Inner (handles the rotation) -->
        <div
          class="card-inner w-full h-full relative"
          :class="{ 'is-flipped': flipped[photo.src] }"
        >
          <!-- CARD FRONT: The standard Polaroid image -->
          <div class="card-front absolute inset-0 bg-cream p-3 pb-5 rounded-sm shadow-soft flex flex-col justify-between">
            <div class="relative w-full aspect-square bg-wine-700/20 overflow-hidden mb-3">
              <img
                v-if="!failed[photo.src]"
                :src="photo.src"
                :alt="photo.caption"
                class="w-full h-full object-cover"
                @error="onImgError(photo.src)"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-4xl text-wine-700/40">
                🖼️
              </div>
            </div>
            <p class="font-accent italic text-wine-800 text-sm text-center px-1">{{ photo.caption }}</p>
          </div>

          <!-- CARD BACK: The secret written letter -->
          <div class="card-back absolute inset-0 bg-cream p-5 rounded-sm shadow-soft flex flex-col justify-between items-center text-center border border-rose-300/10">
            <!-- Decorative Heart and flower border -->
            <div class="text-rose-400 text-sm mt-2">🌸 ✦ 🌸</div>

            <div class="flex-grow flex items-center justify-center">
              <p class="font-accent italic text-wine-900 text-base leading-relaxed px-2">
                {{ photo.backText }}
              </p>
            </div>

            <div class="text-[10px] text-rose-500 font-ui tracking-wider uppercase opacity-60 mb-2">
              Tap to Flip Back 💕
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 3D Flip Card Styles */
.polaroid-wrapper {
  perspective: 1000px;
}

.card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.card-inner.is-flipped {
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
}

.card-front, .card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}

.card-front {
  transform: rotateY(0deg);
  -webkit-transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  /* A nice subtle paper texture overlay for a cozy letter feel */
  background-image: radial-gradient(rgba(110, 48, 73, 0.04) 1px, transparent 1px);
  background-size: 8px 8px;
}
</style>
