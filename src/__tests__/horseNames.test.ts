import { pickRandomHorses } from '../utils/horseNames'
import { expect, describe, it } from 'vitest'

describe('pickRandomHorses', () => {
  it('returns correct number of unique horses', () => {
    const horses = pickRandomHorses(5)
    expect(horses.length).toBe(5)
    expect(new Set(horses).size).toBe(5)
  })

  it('never returns more horses than available', () => {
    const horses = pickRandomHorses(100)
    expect(horses.length).toBeLessThanOrEqual(41)
  })

  it('returns empty array when count is 0', () => {
    const horses = pickRandomHorses(0)
    expect(horses).toEqual([])
  })

  it('returns only unique horses (no duplicates)', () => {
    const horses = pickRandomHorses(20)
    const ids = horses.map(h => h.id)
    expect(new Set(ids).size).toBe(horses.length)
  })

  it('includes Shadow horse when picking all horses', () => {
    const horses = pickRandomHorses(41)
    expect(horses.some(h => h.name === 'Shadow' && h.id === 6)).toBe(true)
  })
})
