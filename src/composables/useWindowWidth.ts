import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useWindowWidth(targetWidth: number) {
  const width = ref(window.innerWidth)

  function handleResize() {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  const isLessThan = computed(() => width.value <= targetWidth)

  return { width, isLessThan }
}