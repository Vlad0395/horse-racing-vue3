import { ref, onBeforeUnmount } from 'vue'

export interface UseRaceAnimationOptions {
  getActiveRace: () => any
  getPlanned: () => any[] // return race.planned or []
  getHorseKeys: () => string[]
  onFinish?: () => void // callback when race finishes
  getPreviewHorseKeys?: () => string[] // keys для прев'ю коли немає активної гонки
  onReset?: () => void // callback після автоматичного reset
  finishDelayMs?: number
}

export function useRaceAnimation(opts: UseRaceAnimationOptions) {
  // СТАН (перший крок винесення)
  const progressMap = ref<Record<string, number>>({}) // ключ коня -> %
  const animFrameId = ref<number | null>(null) // id requestAnimationFrame
  const showFinishPositions = ref(false) // показ кластера після фінішу
  const afterReset = ref(false) // вже виконано reset
  const finishDelayMs = opts.finishDelayMs ?? 1500 // затримка перед reset
  const racePerfStart = new WeakMap<any, number>() // race -> perfStart
  let resetTimeout: number | null = null

  function init() {
    stop()
    if (resetTimeout) {
      clearTimeout(resetTimeout)
      resetTimeout = null
    }
    Object.keys(progressMap.value).forEach(
      (key) => delete progressMap.value[key]
    )
    showFinishPositions.value = false
    afterReset.value = false
    for (const key of opts.getHorseKeys()) {
      progressMap.value[key] = 0
    }
    startLoop()
  }

  function startLoop() {
    const step = () => {
      const race = opts.getActiveRace()
      if (race && race.planned && !race.finishedAt) {
        const now = performance.now()
        let start = racePerfStart.get(race)
        if (start == null) {
          start = now
          racePerfStart.set(race, start)
        }
        const elapsed = now - start
        for (const p of race.planned) {
          const key = p?.horse ? plannedHorseKey(p) : undefined
          if (!key) continue
          const pct = Math.min(100, (elapsed / p.timeMs) * 100)
          progressMap.value[key] = pct
        }
        animFrameId.value = requestAnimationFrame(step)
        return
      }

      if (race && race.results && !showFinishPositions.value) {
        showFinishPositions.value = true
        opts.onFinish?.()
        resetTimeout = window.setTimeout(() => {
          resetToStartPositions()
        }, finishDelayMs) as unknown as number
      }
      if (!opts.getActiveRace() && opts.getPreviewHorseKeys) {
        for (const key of opts.getPreviewHorseKeys()) progressMap.value[key] = 0
      }
      animFrameId.value = null
    }
    animFrameId.value = requestAnimationFrame(step)
  }

  function resetToStartPositions() {
    afterReset.value = true
    showFinishPositions.value = false
    if (!opts.getActiveRace() && opts.getPreviewHorseKeys) {
      for (const key of opts.getPreviewHorseKeys()) progressMap.value[key] = 0
    }
    opts.onReset?.()
  }

  function plannedHorseKey(p: any): string | undefined {
    if (!p || !p.horse) return undefined
    const color = p.horse?.color?.hex ?? p.horse?.color ?? ''
    return `${p.horse.name}|${color}`
  }
  function stop() {
    if (animFrameId.value != null) {
      cancelAnimationFrame(animFrameId.value)
      animFrameId.value = null
    }
    if (resetTimeout) {
      clearTimeout(resetTimeout)
      resetTimeout = null
    }
  }
  onBeforeUnmount(stop)

  return {
    progressMap,
    showFinishPositions,
    afterReset,
    animFrameId,
    finishDelayMs,
    init,
    stop,
    resetToStartPositions,
  }
}
