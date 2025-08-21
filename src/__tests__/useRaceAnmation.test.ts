import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  useRaceAnimation,
  type UseRaceAnimationOptions,
} from '../composables/useRaceAnimation'

describe('useRaceAnimation - startLoop', () => {
  let opts: UseRaceAnimationOptions
  let rafSpy: ReturnType<typeof vi.fn>
  let perfNowSpy: ReturnType<typeof vi.fn>
  let race: any

  beforeEach(() => {
    race = {
      planned: [
        { horse: { id: 1 }, timeMs: 1000 },
        { horse: { id: 2 }, timeMs: 2000 },
      ],
    }
    opts = {
      getActiveRace: () => race,
      getPlanned: () => race.planned,
      getHorseKeys: () => [1, 2],
    }
    rafSpy = vi.fn(() => {
      // Simulate only one frame for test
      return 42
    })
    perfNowSpy = vi.fn()
    globalThis.requestAnimationFrame = rafSpy
    globalThis.performance = {
      now: perfNowSpy,
    } as any
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should update progressMap for each horse on first frame', () => {
    perfNowSpy.mockReturnValueOnce(1000)
    const { progressMap, init } = useRaceAnimation(opts)
    init()
    // Simulate step
    expect(progressMap.value[1]).toBeGreaterThanOrEqual(0)
    expect(progressMap.value[2]).toBeGreaterThanOrEqual(0)
    expect(rafSpy).toHaveBeenCalled()
  })

  it('should clamp progress to 100%', () => {
    perfNowSpy.mockReturnValueOnce(5000)
    const { progressMap, init } = useRaceAnimation(opts)
    init()
    expect(progressMap.value[1]).toBeLessThanOrEqual(100)
    expect(progressMap.value[2]).toBeLessThanOrEqual(100)
  })

  it('should skip planned items without horse id', () => {
    race.planned.push({ horse: {}, timeMs: 1000 })
    perfNowSpy.mockReturnValueOnce(100)
    const { progressMap, init } = useRaceAnimation(opts)
    init()
    // Only '1' and '2' should be present
    expect(Object.keys(progressMap.value)).toContain('1')
    expect(Object.keys(progressMap.value)).toContain('2')
    expect(Object.keys(progressMap.value)).not.toContain(undefined)
  })

  it('should keep animFrameId not null if no active race', () => {
    opts.getActiveRace = () => null
    const { animFrameId, init } = useRaceAnimation(opts)
    init()
    expect(animFrameId.value).not.toBe(null)
  })
})
