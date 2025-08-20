import { describe, it, expect, vi, beforeEach } from 'vitest'
import horsesModule from '../stores/modules/horses'
import { pickRandomHorses, type HorseBase } from '../utils'

vi.mock('../utils', () => ({
  pickRandomHorses: vi.fn(() => [
    { id: 1, name: 'Horse 1' },
    { id: 2, name: 'Horse 2' },
  ]),
}))

describe('horses store module', () => {
  let state: typeof horsesModule.state

  beforeEach(() => {
    state = { horses: [], loading: false }
  })

  describe('mutations', () => {
    it('setHorses sets horses', () => {
      const horses: HorseBase[] = [
        {
          id: 1,
          name: 'Test Horse',
          condition: 'Healthy',
          color: { hex: '#FFFFFF', name: 'White' },
        },
      ]
      horsesModule.mutations.setHorses(state, horses)
      expect(state.horses).toEqual(horses)
    })

    it('setLoading sets loading', () => {
      horsesModule.mutations.setLoading(state, true)
      expect(state.loading).toBe(true)
      horsesModule.mutations.setLoading(state, false)
      expect(state.loading).toBe(false)
    })
  })

  describe('getters', () => {
    it('horses returns horses', () => {
      state.horses = [
        {
          id: 1,
          name: 'Test Horse',
          condition: 'Healthy',
          color: { hex: '#FFFFFF', name: 'White' },
        },
      ]
      expect(horsesModule.getters.horses(state)).toEqual(state.horses)
    })

    it('loading returns loading', () => {
      state.loading = true
      expect(horsesModule.getters.loading(state)).toBe(true)
    })
  })

  describe('actions', () => {
    it('fetchRandomHorses commits correct mutations', () => {
      const commit = vi.fn()
      horsesModule.actions.fetchRandomHorses({ commit }, 2)
      expect(commit).toHaveBeenCalledWith('setLoading', true)
      expect(pickRandomHorses).toHaveBeenCalledWith(2)
      expect(commit).toHaveBeenCalledWith('setHorses', [
        { id: 1, name: 'Horse 1' },
        { id: 2, name: 'Horse 2' },
      ])
      expect(commit).toHaveBeenCalledWith('setLoading', false)
    })

    it('fetchRandomHorses uses default count', () => {
      const commit = vi.fn()
      horsesModule.actions.fetchRandomHorses({ commit })
      expect(pickRandomHorses).toHaveBeenCalledWith(20)
    })
  })
})
