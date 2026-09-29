import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Attach to a template ref. Adds `.is-visible` once the element scrolls
 * into the viewport, used together with the `.reveal` CSS class.
 */
export function useReveal() {
  const target = ref(null)
  let observer

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return target
}
