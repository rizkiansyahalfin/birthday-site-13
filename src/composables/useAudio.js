import { ref, computed } from 'vue'
import { playlist } from '../data/content.js'

// Singleton audio player instance and state shared across all components
const audio = new Audio()
const isPlaying = ref(false)
const currentIndex = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const isWaiting = ref(false) // tracks if the track is loading/buffering
const volume = ref(0.65)
const isMuted = ref(false)
let previousVolume = 0.65

// Configure audio default volume
audio.volume = 0.65

// Set initial track
if (playlist.tracks && playlist.tracks.length > 0) {
  audio.src = playlist.tracks[currentIndex.value].src
}

// Audio Event Listeners
audio.addEventListener('loadedmetadata', () => {
  duration.value = audio.duration || 0
})

audio.addEventListener('durationchange', () => {
  duration.value = audio.duration || 0
})

audio.addEventListener('timeupdate', () => {
  currentTime.value = audio.currentTime
  duration.value = audio.duration || 0
})

audio.addEventListener('ended', () => {
  next()
})

audio.addEventListener('waiting', () => {
  isWaiting.value = true
})

audio.addEventListener('playing', () => {
  isWaiting.value = false
  isPlaying.value = true
})

audio.addEventListener('pause', () => {
  isPlaying.value = false
})

audio.addEventListener('canplay', () => {
  isWaiting.value = false
})

audio.addEventListener('error', () => {
  isWaiting.value = false
})

function togglePlay() {
  if (isPlaying.value) {
    audio.pause()
  } else {
    isWaiting.value = true
    audio.play().catch(() => {
      isWaiting.value = false
    })
  }
}

function selectTrack(i) {
  if (i < 0 || i >= playlist.tracks.length) return
  currentIndex.value = i
  isWaiting.value = true
  audio.src = playlist.tracks[i].src
  audio.currentTime = 0
  audio.play()
    .then(() => {
      isPlaying.value = true
    })
    .catch(() => {
      isWaiting.value = false
    })
}

function next() {
  selectTrack((currentIndex.value + 1) % playlist.tracks.length)
}

function prev() {
  selectTrack((currentIndex.value - 1 + playlist.tracks.length) % playlist.tracks.length)
}

function seek(ratio) {
  if (audio.duration) {
    audio.currentTime = ratio * audio.duration
  }
}

function setVolume(val) {
  const v = Math.max(0, Math.min(1, val))
  volume.value = v
  audio.volume = v
  if (v > 0 && isMuted.value) {
    isMuted.value = false
  } else if (v === 0) {
    isMuted.value = true
  }
}

function toggleMute() {
  if (isMuted.value) {
    isMuted.value = false
    audio.volume = previousVolume > 0 ? previousVolume : 0.65
    volume.value = audio.volume
  } else {
    previousVolume = volume.value
    isMuted.value = true
    audio.volume = 0
    volume.value = 0
  }
}

export function useAudio() {
  return {
    audio,
    isPlaying,
    currentIndex,
    currentTime,
    duration,
    isWaiting,
    volume,
    isMuted,
    currentTrack: computed(() => playlist.tracks[currentIndex.value]),
    togglePlay,
    selectTrack,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
  }
}
