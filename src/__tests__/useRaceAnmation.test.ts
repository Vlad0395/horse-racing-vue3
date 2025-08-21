import { describe, it, expect } from 'vitest'
import { useRaceAnimation, type UseRaceAnimationOptions } from '../composables/useRaceAnimation'



describe('getHorsePosition', () => {
  const horse = { name: 'Thunder', color: { hex: '#fff' } }
  const key = `${horse.name}|${horse.color.hex}`

  function makeOpts(activeRace: any = null): UseRaceAnimationOptions {
    return {
      getActiveRace: () => activeRace,
      getPlanned: () => [],
      getHorseKeys: () => [key],
    }
  }

  it('returns startOffset if no progress and no results', () => {
    const opts = makeOpts()
    const { getHorsePosition } = useRaceAnimation(opts)
    expect(getHorsePosition(horse, opts, {}, false)).toBe(1)
  })

  it('returns calculated position based on progress', () => {
    const opts = makeOpts()
    const { getHorsePosition } = useRaceAnimation(opts)
    expect(getHorsePosition(horse, opts, { [key]: 50 }, false)).toBeCloseTo(48)
    expect(getHorsePosition(horse, opts, { [key]: 100 }, false)).toBe(95)
    expect(getHorsePosition(horse, opts, { [key]: 0 }, false)).toBe(1)
  })

  it('returns finishClusterBase minus position if results and showFinishPositions', () => {
    const activeRace = {
      results: [
        { horse: { name: 'Thunder' }, position: 2 },
      ],
    }
    const opts = makeOpts(activeRace)
    const { getHorsePosition } = useRaceAnimation(opts)
    expect(getHorsePosition(horse, opts, { [key]: 100 }, true)).toBe(99)
  })

  it('returns startOffset if results and !showFinishPositions', () => {
    const activeRace = {
      results: [
        { horse: { name: 'Thunder' }, position: 1 },
      ],
    }
    const opts = makeOpts(activeRace)
    const { getHorsePosition } = useRaceAnimation(opts)
    expect(getHorsePosition(horse, opts, { [key]: 100 }, false)).toBe(1)
  })

  it('uses default values for optional params', () => {
    const opts = makeOpts()
    const { getHorsePosition } = useRaceAnimation(opts)
    expect(getHorsePosition(horse, opts, { [key]: 100 }, false)).toBe(95)
    expect(getHorsePosition(horse, opts, { [key]: 0 }, false)).toBe(1)
  })

  it('handles missing horse color', () => {
    const h = { name: 'Shadow', color: undefined }
    const k = 'Shadow|'
    const opts = makeOpts()
    const { getHorsePosition } = useRaceAnimation(opts)
    expect(getHorsePosition(h, opts, { [k]: 50 }, false)).toBeCloseTo(48)
  })
})