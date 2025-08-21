// Removed direct static list usage; now pulls horses from horses module dynamically

import type { HorseBase } from '../../utils'

export interface ProgramRound {
  round: number
  distance: number // meters
  horses: HorseBase[]
  generatedAt: number
}

interface ProgramsState {
  rounds: ProgramRound[]
  distances: number[]
  totalHorsesPerRound: number
}

const state: ProgramsState = {
  rounds: [],
  // distances: [1200, 1400, 1600, 1800, 2000, 2200],
  distances: [1200, 1400, 1600, 1800, 2000, 2200],
  totalHorsesPerRound: 10,
}

const mutations = {
  setRounds(s: ProgramsState, rounds: ProgramRound[]) {
    s.rounds = rounds
  },
  addRound(s: ProgramsState, round: ProgramRound) {
    s.rounds.push(round)
  },
  clear(s: ProgramsState) {
    s.rounds = []
  },
}

function pickRandomExcluding(
  exclude: Set<string>,
  count: number,
  available:  HorseBase[]
) {
  const pool = available.filter((h) => !exclude.has(h.name + '|' + h.color))
  let source = pool
  if (source.length < count) {
    // fallback: allow all again (so we at least fill the round)
    source = available
  }
  const shuffled = [...source].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

const actions = {
  async generateAll({ commit, state, rootGetters, dispatch }: any) {
    // ensure horses list is populated
    let available = rootGetters['horses/horses']
    if (!available || !available.length) {
      await dispatch('horses/fetchRandomHorses', 20, { root: true })
      available = rootGetters['horses/horses']
    }
    await dispatch('races/resetAll', 20, { root: true })
    commit('clear')
    const all: ProgramRound[] = []
    let lastRoundSet: Set<string> = new Set()
    state.distances.forEach((distance: number, idx: number) => {
      const selected = pickRandomExcluding(
        lastRoundSet,
        state.totalHorsesPerRound,
        available
      )
      const round: ProgramRound = {
        round: idx + 1,
        distance,
        horses: selected,
        generatedAt: Date.now(),
      }
      all.push(round)
      lastRoundSet = new Set(selected.map((h) => h.name + '|' + h.color))
    })
    commit('setRounds', all)
  },
}

const getters = {
  rounds: (s: ProgramsState) => s.rounds,
  byRound: (s: ProgramsState) => (round: number) =>
    s.rounds.find((r) => r.round === round) || null,
  distances: (s: ProgramsState) => s.distances,
}

export default { namespaced: true, state, mutations, actions, getters }
