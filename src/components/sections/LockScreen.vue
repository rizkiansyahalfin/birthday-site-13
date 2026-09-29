<script setup>
import { ref, computed } from 'vue'
import FloatingFlowers from '../FloatingFlowers.vue'
import { profile, lockScreen } from '../../data/content.js'

const emit = defineEmits(['unlocked'])

const entered = ref([])
const shake = ref(false)
const isError = ref(false)
const pinLength = computed(() => profile.secretPin.length)

function press(digit) {
  if (isError.value) return // Block input during error shake
  if (entered.value.length >= pinLength.value) return
  entered.value.push(digit)
  if (entered.value.length === pinLength.value) {
    checkPin()
  }
}

function backspace() {
  if (isError.value) return
  entered.value.pop()
}

function clearAll() {
  if (isError.value) return
  entered.value = []
}

function checkPin() {
  const code = entered.value.join('')
  if (code === profile.secretPin) {
    setTimeout(() => emit('unlocked'), 300)
  } else {
    shake.value = true
    isError.value = true
    setTimeout(() => {
      shake.value = false
      isError.value = false
      entered.value = []
    }, 800)
  }
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
    <FloatingFlowers :count="14" />

    <div
      class="relative z-10 w-full max-w-sm rounded-3xl bg-wine-800/60 backdrop-blur-md border border-rose-300/15 shadow-soft px-8 py-10 text-center transition-transform"
      :class="{ 'animate-[wiggle_0.4s]': shake }"
    >
      <!-- SVG Flower badge on the top border -->
      <div class="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#3D1A2E] border border-rose-300/20 shadow-md flex items-center justify-center p-1.5 z-20 overflow-hidden">
        <svg viewBox="0 0 100 100" class="w-full h-full animate-bob">
          <ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" transform="rotate(72 50 50)" />
          <ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" transform="rotate(144 50 50)" />
          <ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" transform="rotate(216 50 50)" />
          <ellipse cx="50" cy="33" rx="10" ry="16" fill="#EFAFC9" transform="rotate(288 50 50)" />
          <circle cx="50" cy="50" r="10" fill="#FBF3EE" />
        </svg>
      </div>

      <h1 class="font-display text-3xl text-cream mb-2 mt-2">{{ lockScreen?.title || 'For You, My Love' }}</h1>
      <p class="text-rose-200/70 text-sm font-ui mb-6">{{ lockScreen?.subtitle || 'Enter our secret code' }}</p>

      <!-- Pin Entry as Blooming Flowers -->
      <div class="flex justify-center gap-3.5 mb-8 h-6 items-center">
        <div
          v-for="i in pinLength"
          :key="i"
          class="w-5 h-5 flex items-center justify-center transition-all duration-300"
        >
          <svg v-if="entered.length >= i" viewBox="0 0 100 100" class="w-full h-full animate-bloom">
            <ellipse cx="50" cy="33" rx="10" ry="16" :fill="isError ? '#EF5350' : '#EFAFC9'" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="33" rx="10" ry="16" :fill="isError ? '#EF5350' : '#EFAFC9'" transform="rotate(72 50 50)" />
            <ellipse cx="50" cy="33" rx="10" ry="16" :fill="isError ? '#EF5350' : '#EFAFC9'" transform="rotate(144 50 50)" />
            <ellipse cx="50" cy="33" rx="10" ry="16" :fill="isError ? '#EF5350' : '#EFAFC9'" transform="rotate(216 50 50)" />
            <ellipse cx="50" cy="33" rx="10" ry="16" :fill="isError ? '#EF5350' : '#EFAFC9'" transform="rotate(288 50 50)" />
            <circle cx="50" cy="50" r="10" fill="#FBF3EE" />
          </svg>
          <span v-else class="w-2.5 h-2.5 rounded-full border border-rose-300/40 bg-transparent transition-all duration-300"></span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 justify-center">
        <button
          v-for="k in keys"
          :key="k"
          @click="press(k)"
          class="w-16 h-16 rounded-full bg-wine-700/60 hover:bg-wine-600 text-cream font-display text-xl transition-colors"
        >
          {{ k }}
        </button>

        <button
          @click="clearAll"
          class="w-16 h-16 rounded-full bg-wine-700/60 hover:bg-wine-600 text-rose-300 flex items-center justify-center transition-colors"
          aria-label="Clear"
        >
          ✕
        </button>
        <button
          @click="press('0')"
          class="w-16 h-16 rounded-full bg-wine-700/60 hover:bg-wine-600 text-cream font-display text-xl transition-colors"
        >
          0
        </button>
        <button
          @click="backspace"
          class="w-16 h-16 rounded-full bg-wine-700/60 hover:bg-wine-600 text-rose-300 flex items-center justify-center transition-colors"
          aria-label="Backspace"
        >
          ↵
        </button>
      </div>

      <p class="text-xs font-ui mt-8 transition-colors duration-300 h-4" :class="isError ? 'text-rose-400 font-semibold' : 'text-rose-200/50'">
        {{ isError ? 'Incorrect code, try again! 🤫' : 'Hint: our special date 💕' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes wiggle {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.animate-bob {
  animation: bob 3s ease-in-out infinite;
  transform-origin: center;
}

@keyframes bloom {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bloom {
  animation: bloom 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  transform-origin: center;
}
</style>
