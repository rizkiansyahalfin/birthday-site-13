<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingScreen from './components/sections/LoadingScreen.vue'
import LockScreen from './components/sections/LockScreen.vue'
import GiftReveal from './components/sections/GiftReveal.vue'
import Hero from './components/sections/Hero.vue'
import Bouquet from './components/sections/Bouquet.vue'
import WhyILoveYou from './components/sections/WhyILoveYou.vue'
import Letter from './components/sections/Letter.vue'
import PhotoMemories from './components/sections/PhotoMemories.vue'
import Timeline from './components/sections/Timeline.vue'
import Playlist from './components/sections/Playlist.vue'
import GratitudeJar from './components/sections/GratitudeJar.vue'
import Closing from './components/sections/Closing.vue'
import Modal from './components/Modal.vue'
import WishGrantedModal from './components/WishGrantedModal.vue'
import MusicButton from './components/MusicButton.vue'
import FloatingFlowers from './components/FloatingFlowers.vue'
import { useAudio } from './composables/useAudio.js'

const stage = ref('loading') // 'loading' -> 'lock' -> 'gift' -> 'content'
const showModal = ref(false)
const showWishModal = ref(false)
const modalShownOnce = ref(false)

const { isPlaying, selectTrack, togglePlay } = useAudio()

const showBackToTop = ref(false)

function handleScroll() {
  showBackToTop.value = window.scrollY > 400
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Preload all gift reveal photos and the background image in the background
  const imagesToPreload = [
    '/photos/foto-1.jpg',
    '/photos/foto-2.jpg',
    '/photos/foto-3.jpg',
    '/photos/foto-4.jpg',
    '/photos/foto-5.jpg',
    '/photos/foto-6.jpg',
    '/photos/foto-7.jpg',
    '/photos/foto-8.jpg',
    '/photos/foto-9.jpg',
    '/photos/foto-10.jpg',
    '/photos/letter-bg.jpg'
  ]

  imagesToPreload.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onLoaded() {
  stage.value = 'lock'
}

function onUnlocked() {
  stage.value = 'gift'
  // Autoplay music upon unlocking (browser audio context is active due to user typing interaction)
  selectTrack(0)
}
function onGiftOpened() {
  stage.value = 'content'
}
function onClosingArrived() {
  if (!modalShownOnce.value) {
    modalShownOnce.value = true
    setTimeout(() => {
      showModal.value = true
    }, 400)
  }
}
function onClosingLeft() {
  modalShownOnce.value = false
}

function onCandleBlown() {
  setTimeout(() => {
    showWishModal.value = true
  }, 1000)
}
</script>

<template>
  <main class="relative min-h-screen bg-wine-gradient">
    <Transition name="fade" mode="out-in">
      <LoadingScreen v-if="stage === 'loading'" @loaded="onLoaded" key="loading" />
      <LockScreen v-else-if="stage === 'lock'" @unlocked="onUnlocked" key="lock" />
      <GiftReveal v-else-if="stage === 'gift'" @opened="onGiftOpened" key="gift" />

      <div v-else key="content" class="w-full bg-[#170410]">
        <Hero class="section-hero border-b border-rose-300/10" />
        <Bouquet class="section-bouquet border-b border-rose-300/10" />
        <WhyILoveYou class="section-why border-b border-rose-300/10" />
        <Letter class="section-letter border-b border-rose-300/10" />
        <PhotoMemories class="section-photo border-b border-rose-300/10" />
        <Timeline class="section-timeline border-b border-rose-300/10" />
        <Playlist class="section-playlist border-b border-rose-300/10" />
        <GratitudeJar class="section-jar border-b border-rose-300/10" />
        <Closing class="section-closing" @arrived="onClosingArrived" @left="onClosingLeft" @blown="onCandleBlown" />

        <MusicButton :is-playing="isPlaying" @toggle="togglePlay" />
        <Modal :show="showModal" @close="showModal = false" />
        <WishGrantedModal :show="showWishModal" @close="showWishModal = false" />

        <!-- Heavy flower shower saweran on top of the screen when modal is open -->
        <FloatingFlowers v-if="showModal || showWishModal" :count="50" :show-snow="false" saweran class="!z-[60]" />

        <!-- Floating Back to Top Button (Heart balloon style) -->
        <Transition name="fade">
          <button
            v-if="showBackToTop"
            @click="scrollToTop"
            class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-rose-400/90 hover:bg-rose-500 shadow-soft flex items-center justify-center text-cream hover:scale-110 active:scale-95 transition-all duration-300 border border-rose-300/30 cursor-pointer animate-bob"
            aria-label="Scroll to top"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </Transition>
      </div>
    </Transition>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes float-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.animate-bob {
  animation: float-bob 3s ease-in-out infinite;
}
</style>
