import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Attach to a template ref. Adds `.is-visible` once the element scrolls
 * into the viewport, used together with the `.reveal` CSS class.
 */
export function useReveal(options = {}) {
  const target = ref(null)
  let observer

  onMounted(() => {
    if (!target.value) return

    // Immediately reveal if already in or near viewport
    const rect = target.value.getBoundingClientRect()
    if (rect.top < window.innerHeight + 100 && rect.bottom > 0) {
      target.value.classList.add('is-visible')
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          entry.target.classList.add('is-visible')
          if (observer) observer.unobserve(entry.target)
        }
      },
      {
        threshold: options.threshold ?? 0.02,
        rootMargin: options.rootMargin ?? '40px 0px',
        ...options,
      }
    )
    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return target
}
