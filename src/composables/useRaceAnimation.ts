import { ref } from 'vue'
import type { HorseBase } from '../utils'

export interface UseRaceAnimationOptions {
  getActiveRace: () => any
  getPlanned: () => any[]
  getHorseKeys: () => number[]
}

export function useRaceAnimation(opts: UseRaceAnimationOptions) {
  const progressMap = ref<Record<string, number>>({})
  const animFrameId = ref<number | null>(null) 
  const racePerfStart = new WeakMap<any, number>()

  function init() {
    Object.keys(progressMap.value).forEach(
      (key) => delete progressMap.value[key]
    )
    for (const key of opts.getHorseKeys()) {
      progressMap.value[key] = 0
    }
    startLoop()
  }

  function startLoop() {
    const step = () => {
      const race = opts.getActiveRace()
      if (race && race.planned) {
        const now = performance.now()
        let start = racePerfStart.get(race)
        if (start == null) {
          start = now
          racePerfStart.set(race, start)
        }
        const elapsed = now - start
        for (const p of race.planned) {
          if (!p?.horse?.id) continue
          const pct = Math.min(100, (elapsed / p.timeMs) * 100)
          progressMap.value[p.horse.id] = pct
        }
        animFrameId.value = requestAnimationFrame(step)
        return
      }
      animFrameId.value = null
      return
    }
    animFrameId.value = requestAnimationFrame(step)
  }

  function getHorsePosition(
    h: HorseBase,
    progressMap: Record<string, number>,
    startOffset = 1,
    liveFinish = 95
  ) {
    const val = progressMap[h.id]
    if (val == null) return startOffset
    const from = startOffset
    const to = liveFinish
    const position =
      from + (to - from) * (Math.min(100, Math.max(0, val)) / 100)
    return position
  }

  return {
    progressMap,
    animFrameId,
    init,
    getHorsePosition,
  }
}
