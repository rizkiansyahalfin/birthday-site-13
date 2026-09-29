<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  count: { type: Number, default: 10 },
  emojis: {
    type: Array,
    default: () => ['🌸', '🌷', '🌼', '🌺', '🏍️', '🖤', '✨'],
  },
  showSnow: { type: Boolean, default: true },
  snowCount: { type: Number, default: 24 },
  saweran: { type: Boolean, default: false },
})

const isMobile = ref(false)

function checkScreenSize() {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

function rand(min, max) {
  return Math.random() * (max - min) + min
}

const petals = computed(() => {
  // Substantially reduce falling items on mobile to preserve CPU/GPU frame rates
  const resolvedCount = isMobile.value 
    ? (props.saweran ? 20 : 6) 
    : props.count

  return Array.from({ length: resolvedCount }, (_, i) => {
    // Faster fall duration and positive delay for a cascading waterfall shower effect
    const duration = props.saweran ? rand(2.5, 5) : rand(8, 16)
    const delay = props.saweran ? rand(0, 2) : rand(-16, 0)
    return {
      id: i,
      emoji: props.emojis[Math.floor(Math.random() * props.emojis.length)],
      left: rand(0, 100),
      size: props.saweran ? rand(1.2, 2.2) : rand(0.8, 1.6),
      duration,
      delay,
    }
  })
})

const snowflakes = computed(() => {
  const resolvedSnowCount = isMobile.value ? 8 : props.snowCount
  return Array.from({ length: resolvedSnowCount }, (_, i) => {
    const duration = rand(6, 12)
    const delay = rand(-12, 0)
    return {
      id: i,
      left: rand(0, 100),
      size: rand(2.5, 6), // snowflake size in pixels
      opacity: rand(0.3, 0.75),
      duration,
      delay,
    }
  })
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-30" aria-hidden="true">
    <!-- Falling Flowers -->
    <span
      v-for="p in petals"
      :key="'petal-' + p.id"
      class="falling-petal"
      :style="{
        left: p.left + '%',
        fontSize: p.size + 'rem',
        animationDuration: p.duration + 's',
        animationDelay: p.delay + 's',
      }"
    >{{ p.emoji }}</span>

    <!-- Falling/Wandering Snowflakes -->
    <span
      v-if="showSnow"
      v-for="s in snowflakes"
      :key="'snow-' + s.id"
      class="snowflake"
      :style="{
        left: s.left + '%',
        width: s.size + 'px',
        height: s.size + 'px',
        opacity: s.opacity,
        animationDuration: s.duration + 's',
        animationDelay: s.delay + 's',
      }"
    />
  </div>
</template>

<style scoped>
@keyframes fall {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 0.65;
  }
  85% {
    opacity: 0.65;
  }
  100% {
    transform: translateY(115vh) translateX(100px) rotate(360deg);
    opacity: 0;
  }
}

.falling-petal {
  position: absolute;
  top: 0;
  pointer-events: none;
  animation: fall linear infinite;
  user-select: none;
  will-change: transform, opacity;
}

@keyframes snowfall {
  0% {
    transform: translateY(-10vh) translateX(0);
  }
  30% {
    transform: translateY(30vh) translateX(20px);
  }
  65% {
    transform: translateY(70vh) translateX(-20px);
  }
  100% {
    transform: translateY(115vh) translateX(15px);
  }
}

.snowflake {
  position: absolute;
  top: 0;
  background: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  animation: snowfall linear infinite;
  user-select: none;
  will-change: transform, opacity;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
}
</style>


