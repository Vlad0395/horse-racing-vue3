import { describe, it, expect, beforeEach } from 'vitest'
import programs from '../stores/modules/programs'

describe('programs store', () => {
  let state: typeof programs.state

  beforeEach(() => {
    state = { ...programs.state, rounds: [] }
  })

  it('should have correct default distances', () => {
    expect(state.distances).toEqual([1200, 1400, 1600, 1800, 2000, 2200])
  })

  it('should clear rounds', () => {
    state.rounds = [{ round: 1, distance: 1200, horses: [], generatedAt: Date.now() }]
    programs.mutations.clear(state)
    expect(state.rounds).toEqual([])
  })

  it('should set rounds', () => {
    const rounds = [
      { round: 1, distance: 1200, horses: [], generatedAt: Date.now() },
      { round: 2, distance: 1400, horses: [], generatedAt: Date.now() }
    ]
    programs.mutations.setRounds(state, rounds)
    expect(state.rounds).toEqual(rounds)
  })

  it('should add a round', () => {
    const round = { round: 1, distance: 1200, horses: [], generatedAt: Date.now() }
    programs.mutations.addRound(state, round)
    expect(state.rounds).toContain(round)
  })

  it('getter rounds should return rounds', () => {
    state.rounds = [{ round: 1, distance: 1200, horses: [], generatedAt: Date.now() }]
    expect(programs.getters.rounds(state)).toEqual(state.rounds)
  })

  it('getter byRound should return correct round or null', () => {
    const round = { round: 2, distance: 1400, horses: [], generatedAt: Date.now() }
    state.rounds = [
      { round: 1, distance: 1200, horses: [], generatedAt: Date.now() },
      round
    ]
    expect(programs.getters.byRound(state)(2)).toEqual(round)
    expect(programs.getters.byRound(state)(99)).toBeNull()
  })

  it('getter distances should return distances', () => {
    expect(programs.getters.distances(state)).toEqual([1200, 1400, 1600, 1800, 2000, 2200])
  })
})