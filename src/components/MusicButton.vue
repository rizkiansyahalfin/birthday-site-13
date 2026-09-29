<script setup>
const props = defineProps({
  isPlaying: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle'])
</script>

<template>
  <button
    @click="emit('toggle')"
    class="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#DC7FA3] hover:bg-[#C85C83] shadow-soft flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-wine-950/10"
    :class="{ 'playing-pulse': isPlaying }"
    aria-label="Toggle background music"
  >
    <!-- SVG Music Note -->
    <svg class="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6V3h-8z"/>
    </svg>
  </button>
</template>

<style scoped>
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(220, 127, 163, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(220, 127, 163, 0);
  }
}

.playing-pulse {
  animation: pulse-glow 2s infinite;
}
</style>

