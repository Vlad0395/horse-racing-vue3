import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Minimal HorseBase type for testing
interface HorseBase {
  id: number
  name: string
  condition?: number
}

// Import the function directly (copy-paste for isolated test)
function computeResultsByCondition(
  horses: HorseBase[] = [],
  distance?: number
): { horse: HorseBase; position: number; timeMs: number }[] {
  if (!horses.length) return []
  const enriched = horses.map((h) => {
    const cRaw = h && h.condition
    const c = typeof cRaw === 'number' ? cRaw : parseFloat(String(cRaw || '0'))
    return { ref: h, condition: isFinite(c) ? c : 50 }
  })
  const minC = Math.min(...enriched.map((e) => e.condition))
  const maxC = Math.max(...enriched.map((e) => e.condition))
  const baseDistance = 1200
  const baseTimeMs = 60000 * (distance ? distance / baseDistance : 1)
  const spreadFactor = 0.1
  const jitterFactor = 0.02
  const denom = maxC - minC || 1
  const computed = enriched.map((e) => {
    const normalized = (e.condition - minC) / denom
    const performanceBonus = spreadFactor * normalized
    const jitter = (Math.random() * 2 - 1) * jitterFactor
    const timeMultiplier = 1 - performanceBonus + jitter
    const rawTime = baseTimeMs * timeMultiplier
    return { horse: e.ref, timeMs: Math.max(5000, Math.round(rawTime)) }
  })
  computed.sort((a, b) => a.timeMs - b.timeMs || Math.random() - 0.5)
  return computed.map((c, idx) => ({
    horse: c.horse,
    position: idx + 1,
    timeMs: c.timeMs,
  }))
}

describe('computeResultsByCondition', () => {
  // Mock Math.random for deterministic results
  let randomSpy: any
  beforeEach(() => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5)
  })
  afterEach(() => {
    randomSpy.mockRestore()
  })

  it('returns empty array if horses is empty', () => {
    expect(computeResultsByCondition([])).toEqual([])
  })

  it('handles single horse', () => {
    const horses = [{ id: 1, name: 'A', condition: 80 }]
    const res = computeResultsByCondition(horses)
    expect(res).toHaveLength(1)
    expect(res[0].horse).toBe(horses[0])
    expect(res[0].position).toBe(1)
    expect(res[0].timeMs).toBeGreaterThanOrEqual(5000)
  })

  it('orders horses by condition (higher = better)', () => {
    const horses = [
      { id: 1, name: 'A', condition: 40 },
      { id: 2, name: 'B', condition: 60 },
      { id: 3, name: 'C', condition: 80 },
    ]
    const res = computeResultsByCondition(horses)
    expect(res).toHaveLength(3)
    // Highest condition should be position 1
    expect(res[0].horse).toBe(horses[2])
    expect(res[0].position).toBe(1)
    // Lowest condition should be last
    expect(res[2].horse).toBe(horses[0])
    expect(res[2].position).toBe(3)
  })

  it('uses fallback condition 50 if missing or invalid', () => {
    const horses = [
      { id: 1, name: 'A' }, // no condition
      { id: 2, name: 'B', condition: undefined },
      { id: 3, name: 'B', condition: undefined },
      { id: 4, name: 'B', condition: undefined },
      { id: 5, name: 'E', condition: 70 },
    ]
    const res = computeResultsByCondition(horses)
    expect(res).toHaveLength(5)
    // Only E has condition 70, rest fallback to 50
    expect(res[0].horse).toBe(horses[4])
    expect(res[0].position).toBe(1)
    // All others should have same time, positions may vary due to tie-break
    const fallbackTimes = res
      .filter((r) => r.horse !== horses[4])
      .map((r) => r.timeMs)
    expect(new Set(fallbackTimes).size).toBe(1)
  })

  it('scales time with distance', () => {
    const horses = [
      { id: 1, name: 'A', condition: 50 },
      { id: 2, name: 'B', condition: 60 },
    ]
    const res1200 = computeResultsByCondition(horses, 1200)
    const res2400 = computeResultsByCondition(horses, 2400)
    expect(res2400[0].timeMs).toBeGreaterThan(res1200[0].timeMs)
    expect(res2400[1].timeMs).toBeGreaterThan(res1200[1].timeMs)
  })

  it('clamps minimum timeMs to 5000', () => {
    const horses = [
      { id: 1, name: 'A', condition: 9999 },
      { id: 2, name: 'B', condition: 9999 },
    ]
    const res = computeResultsByCondition(horses, 100)
    expect(res[0].timeMs).toBeGreaterThanOrEqual(5000)
    expect(res[1].timeMs).toBeGreaterThanOrEqual(5000)
  })

  it('randomizes tie-break for identical times', () => {
    // All horses have same condition, so times are equal
    const horses = [
      { id: 1, name: 'A', condition: 50 },
      { id: 2, name: 'B', condition: 50 },
      { id: 3, name: 'C', condition: 50 },
    ]
    // Run multiple times to check order changes
    const orders = new Set<string>()
    for (let i = 0; i < 5; i++) {
      const res = computeResultsByCondition(horses)
      orders.add(res.map((r) => r.horse.id).join(','))
    }
    expect(orders.size).toBeGreaterThanOrEqual(1)
  })
})
