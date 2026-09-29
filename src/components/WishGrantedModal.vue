<script setup>
import { ref, watch } from 'vue'
import { wishGrantedPhotos } from '../data/content.js'

const props = defineProps({
  show: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const flipped = ref({})
const failed = ref({})

function toggleFlip(i) {
  flipped.value[i] = !flipped.value[i]
}

function onImgError(i) {
  failed.value[i] = true
}

// Reset flipped state when modal closes/opens
watch(() => props.show, (newVal) => {
  if (!newVal) {
    flipped.value = {}
  }
})

const tilts = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', 'rotate-1', '-rotate-2']
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md px-4 py-8 flex items-start justify-center"
      @click.self="emit('close')"
    >
      <div class="relative w-full max-w-5xl rounded-3xl bg-[#2d0a1e]/95 border border-rose-300/20 shadow-soft p-6 sm:p-10 text-center my-8">

        <!-- Close Button top right -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-rose-950/60 hover:bg-rose-900/60 border border-rose-300/20 flex items-center justify-center text-rose-200 transition-all duration-300 hover:scale-110"
        >
          ✕
        </button>

        <div class="text-5xl mb-4 animate-bounce">✨🎂✨</div>
        <h3 class="font-display text-3xl sm:text-4xl text-cream mb-2">{{ wishGrantedPhotos.title ?? 'Harapanmu Telah Terkabul! 💕' }}</h3>
        <p class="text-rose-200/70 font-accent italic mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {{ wishGrantedPhotos.subtitle ?? '"Semoga semua doa dan kebaikan kembali kepadamu. Dan semoga lembaran memori manis ini akan terus bertambah seiring berjalannya waktu."' }}
        </p>

        <!-- Grid of polaroids -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center max-w-full mx-auto my-6">
          <div
            v-for="(photo, i) in wishGrantedPhotos.photos"
            :key="i"
            class="polaroid-wrapper relative w-40 h-[240px] cursor-pointer select-none transition-all duration-500 hover:scale-105 hover:rotate-0"
            :class="tilts[i % tilts.length]"
            :style="{
              animationDelay: `${i * 100}ms`,
              animationName: 'fade-up',
              animationDuration: '0.6s',
              animationFillMode: 'both'
            }"
            @click="toggleFlip(i)"
          >
            <!-- Card Inner -->
            <div
              class="card-inner w-full h-full relative"
              :class="{ 'is-flipped': flipped[i] }"
            >
              <!-- CARD FRONT -->
              <div class="card-front absolute inset-0 bg-cream p-2 pb-4 rounded-sm shadow-soft flex flex-col justify-between">
                <div class="relative w-full aspect-square bg-wine-700/20 overflow-hidden mb-2">
                  <img
                    v-if="!failed[i]"
                    :src="photo.src"
                    :alt="photo.caption"
                    class="w-full h-full object-cover"
                    @error="onImgError(i)"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-3xl text-wine-700/40">
                    🖼️
                  </div>
                </div>
                <p class="font-accent italic text-wine-800 text-[10px] text-center px-1 leading-tight truncate">{{ photo.caption }}</p>
              </div>

              <!-- CARD BACK -->
              <div class="card-back absolute inset-0 bg-cream p-3 rounded-sm shadow-soft flex flex-col justify-between items-center text-center border border-rose-300/10">
                <div class="text-rose-400 text-[10px] mt-1">🌸 ✦ 🌸</div>
                <div class="flex-grow flex items-center justify-center">
                  <p class="font-accent italic text-wine-900 text-[11px] leading-relaxed px-1">
                    {{ photo.backText }}
                  </p>
                </div>
                <div class="text-[8px] text-rose-500 font-ui tracking-wider uppercase opacity-60 mb-1">
                  Tap to Flip 💕
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="emit('close')"
          class="mt-8 px-10 py-3 rounded-full bg-rose-400/20 hover:bg-rose-400/30 border border-rose-300/30 text-rose-100 font-ui text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
        >
          {{ wishGrantedPhotos.closeLabel ?? 'Aamiin 🌸' }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.polaroid-wrapper {
  perspective: 1000px;
}

.card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-inner.is-flipped {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
  background-image: radial-gradient(rgba(110, 48, 73, 0.04) 1px, transparent 1px);
  background-size: 6px 6px;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.4s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
</style>
