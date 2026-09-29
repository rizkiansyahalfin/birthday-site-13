<script setup>
import { ref, computed } from 'vue'
import { useReveal } from '../../composables/useReveal.js'
import { whyILoveYou } from '../../data/content.js'

const sectionRef = useReveal()
const isExpanded = ref(false)
const searchQuery = ref('')
const particles = ref([])
let particleId = 0

const filteredItems = computed(() => {
  if (!searchQuery.value) return whyILoveYou.allItems
  return whyILoveYou.allItems.filter(item =>
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function handleReveal(e) {
  isExpanded.value = true

  // Get button coordinates for particle blast origin
  const rect = e.target.getBoundingClientRect()
  const parentRect = e.target.parentElement.getBoundingClientRect()
  const x = rect.left - parentRect.left + rect.width / 2
  const y = rect.top - parentRect.top + rect.height / 2

  spawnBurst(x, y)
}

function spawnBurst(x, y) {
  const sparkEmojis = ['🩷', '💖', '🌿', '✨', '🤍', '💛', '💕']
  for (let i = 0; i < 24; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 100 + 40
    const destX = Math.cos(angle) * distance
    const destY = Math.sin(angle) * distance

    const id = particleId++
    const p = {
      id,
      emoji: sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)],
      style: {
        position: 'absolute',
        top: y + 'px',
        left: x + 'px',
        transform: 'translate(-50%, -50%)',
        fontSize: Math.random() * 8 + 14 + 'px',
        pointerEvents: 'none',
        zIndex: 50,
        '--dx': destX + 'px',
        '--dy': destY + 'px',
      }
    }
    particles.value.push(p)

    setTimeout(() => {
      particles.value = particles.value.filter(item => item.id !== id)
    }, 1000)
  }
}
</script>

<template>
  <section ref="sectionRef" class="reveal relative min-h-screen flex flex-col items-center px-6 py-24 text-center overflow-hidden">
    <p class="text-rose-300 font-ui text-xs tracking-[0.2em] uppercase mb-4">— {{ whyILoveYou.eyebrow }} —</p>
    <h2 class="font-display text-4xl sm:text-5xl text-cream mb-12">{{ whyILoveYou.title }}</h2>

    <!-- Sparkle particles layer -->
    <div class="absolute inset-0 pointer-events-none z-40">
      <span
        v-for="p in particles"
        :key="p.id"
        class="burst-particle select-none"
        :style="p.style"
      >{{ p.emoji }}</span>
    </div>

    <!-- 3 Initial Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12 relative z-10">
      <!-- Card 1 -->
      <div class="flex flex-col justify-between items-center rounded-3xl bg-wine-800/40 border border-rose-300/10 px-6 py-8 hover:bg-wine-800/50 hover:border-rose-300/20 transition-all duration-300 shadow-soft min-h-[200px]">
        <span class="font-display text-5xl text-rose-300/30 mb-4">01</span>
        <p class="font-accent italic text-cream text-base leading-relaxed">{{ whyILoveYou.initialItems[0] }}</p>
        <span class="text-rose-300 text-xs mt-4">✦</span>
      </div>

      <!-- Card 2 -->
      <div class="flex flex-col justify-between items-center rounded-3xl bg-wine-800/40 border border-rose-300/10 px-6 py-8 hover:bg-wine-800/50 hover:border-rose-300/20 transition-all duration-300 shadow-soft min-h-[200px]">
        <span class="font-display text-5xl text-rose-300/30 mb-4">02</span>
        <p class="font-accent italic text-cream text-base leading-relaxed">{{ whyILoveYou.initialItems[1] }}</p>
        <span class="text-rose-300 text-xs mt-4">✦</span>
      </div>

      <!-- Card 3 -->
      <div class="flex flex-col justify-between items-center rounded-3xl bg-wine-800/40 border border-rose-300/10 px-6 py-8 hover:bg-wine-800/50 hover:border-rose-300/20 transition-all duration-300 shadow-soft min-h-[200px]">
        <span class="font-display text-5xl text-rose-300/30 mb-4">03</span>
        <p class="font-accent italic text-cream text-base leading-relaxed">{{ whyILoveYou.initialItems[2] }}</p>
        <span class="text-rose-300 text-xs mt-4">✦</span>
      </div>
    </div>

    <!-- Expansion Container -->
    <div class="relative w-full max-w-3xl flex flex-col items-center z-10">

      <!-- Reveal Trigger Button -->
      <transition name="fade-btn">
        <button
          v-if="!isExpanded"
          @click="handleReveal"
          class="px-10 py-4 rounded-full bg-[#5DA16D] hover:bg-[#4B8E6C] border-2 border-wine-950/20 text-white font-ui text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-soft-large animate-bounce-gentle"
        >
          Masa Cuma 3 Hal? 🤔 Lihat Selengkapnya ✨
        </button>
      </transition>

      <!-- Expandable reasons container -->
      <transition name="expand">
        <div v-if="isExpanded" class="w-full flex flex-col items-center">

          <!-- Search box -->
          <div class="relative w-full max-w-md mb-6 transition-all duration-300">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari alasan sayang... 🔍"
              class="w-full px-6 py-3 rounded-full bg-wine-900/40 border border-rose-300/20 text-cream placeholder-rose-200/40 text-sm focus:outline-none focus:border-rose-300/50 focus:ring-1 focus:ring-rose-300/50 font-accent italic transition-all shadow-inner"
            />
            <span v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-rose-300/60 hover:text-rose-300 text-xs">✕</span>
          </div>

          <!-- Love Notes Scrolling Box -->
          <div class="w-full max-h-[500px] overflow-y-auto px-4 py-4 rounded-3xl bg-wine-900/20 border border-rose-300/10 shadow-inner custom-love-scroll scroll-smooth">
            <transition-group name="list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="(item, index) in filteredItems"
                :key="item"
                class="flex items-start gap-3 text-left bg-wine-800/40 border border-rose-300/5 rounded-2xl p-4 hover:bg-wine-800/55 hover:border-rose-300/15 transition-all duration-200 hover:-translate-y-[2px]"
              >
                <!-- Badge Number -->
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-rose-300/20 border border-rose-300/30 flex items-center justify-center font-display text-[10px] text-rose-200 font-bold">
                  {{ whyILoveYou.allItems.indexOf(item) + 1 }}
                </span>

                <!-- Text -->
                <p class="font-accent italic text-rose-100/90 text-xs sm:text-sm leading-relaxed">{{ item }}</p>
              </div>
            </transition-group>

            <!-- Empty state -->
            <div v-if="filteredItems.length === 0" class="py-12 text-center text-xs font-accent italic text-rose-200/40">
              Tidak ada alasan yang cocok... tapi aku tetep sayang kamu! 💖
            </div>
          </div>

          <!-- Bottom closure helper -->
          <p class="text-[11px] font-accent italic text-rose-300/50 mt-6 animate-pulse">
            Terbuka total {{ whyILoveYou.allItems.length }} alasan manis untukmu. 💖
          </p>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
/* Particle blast animation */
.burst-particle {
  animation: burst-fly 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes burst-fly {
  0% {
    transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.3) rotate(360deg);
    opacity: 0;
  }
}

/* Custom bounce for surprise button */
@keyframes bounceGentle {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.02); }
}
.animate-bounce-gentle {
  animation: bounceGentle 2s ease-in-out infinite;
}

/* Custom Scrollbar */
.custom-love-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-love-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-love-scroll::-webkit-scrollbar-thumb {
  background: rgba(239, 175, 201, 0.2);
  border-radius: 99px;
}
.custom-love-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(239, 175, 201, 0.4);
}

/* Expand Animation (reveal list container) */
.expand-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.expand-enter-to {
  max-height: 700px;
  opacity: 1;
}
.expand-leave-active {
  transition: all 0.4s ease;
  max-height: 700px;
  opacity: 1;
}
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Fade button transition */
.fade-btn-leave-active {
  transition: all 0.3s ease;
}
.fade-btn-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* List element transitions */
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.list-move {
  transition: transform 0.4s ease;
}
</style>
