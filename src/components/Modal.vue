<script setup>
import { modal } from '../data/content.js'

const props = defineProps({
  show: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])
</script>

<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
      @click.self="emit('close')"
    >
      <div class="w-full max-w-sm rounded-3xl bg-[#3D1A2E]/80 backdrop-blur-md border border-rose-300/20 shadow-soft px-8 py-10 text-center">
        <div class="text-5xl mb-5">{{ modal.emoji }}</div>
        <h3 class="font-display text-3xl text-cream mb-2">{{ modal.title }}</h3>
        <p class="text-rose-200/70 font-accent italic mb-8">{{ modal.subtitle }}</p>
        <button
          @click="emit('close')"
          class="px-8 py-2.5 rounded-full bg-rose-300/10 hover:bg-rose-300/20 border border-rose-300/20 text-rose-100 font-ui text-xs tracking-wider transition-all duration-300"
        >
          {{ modal.buttonLabel }}
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
</style>
