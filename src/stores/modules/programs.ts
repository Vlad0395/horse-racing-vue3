// Removed direct static list usage; now pulls horses from horses module dynamically

import type { HorseBase } from '../../utils'

interface ProgramRound {
  round: number
  distance: number // meters
  horses: { name: string; condition: string; color: string }[]
  generatedAt: number
}

interface ProgramsState {
  rounds: ProgramRound[]
  distances: number[]
  totalHorsesPerRound: number
}

const state: ProgramsState = {
  rounds: [],
  distances: [1200, 1400],
  // distances: [1200, 1400, 1600, 1800, 2000, 2200],
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
  available: { name: string; condition: string; color: string }[]
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
    let available = rootGetters['horses/horses'] as HorseBase[]
    if (!available || !available.length) {
      await dispatch('horses/fetchRandomHorses', 20, { root: true })
      available = rootGetters['horses/horses']
    }
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
  regenerateRound({ commit, state }: any, roundNumber: number) {
    const index = roundNumber - 1
    if (index < 0 || index >= state.distances.length) return
    // Determine exclusion based on previous round (if exists)
    let exclude = new Set<string>()
    if (state.rounds[index - 1]) {
      exclude = new Set(
        state.rounds[index - 1].horses.map((h: any) => h.name + '|' + h.color)
      )
    }
    // Note: regeneration still currently uses static availability of existing rounds' horses
    // Better: source from horses module again to reflect latest pool
    // We'll gather union of horses appearing in current program; if empty, leave as is.
    const currentPool = state.rounds.flatMap((r: ProgramRound) => r.horses)
    const replacement = pickRandomExcluding(
      exclude,
      state.totalHorsesPerRound,
      currentPool.length ? currentPool : []
    )
    const updated: ProgramRound = {
      round: roundNumber,
      distance: state.distances[index],
      horses: replacement,
      generatedAt: Date.now(),
    }
    const newRounds = [...state.rounds]
    newRounds[index] = updated
    // Also, if we changed this round, recompute subsequent rounds to maintain rule
    let lastSet = new Set(updated.horses.map((h) => h.name + '|' + h.color))
    for (let i = index + 1; i < state.distances.length; i++) {
      const pool = newRounds[i] ? newRounds[i].horses : currentPool
      const nextSelected = pickRandomExcluding(
        lastSet,
        state.totalHorsesPerRound,
        pool
      )
      newRounds[i] = {
        round: i + 1,
        distance: state.distances[i],
        horses: nextSelected,
        generatedAt: Date.now(),
      }
      lastSet = new Set(nextSelected.map((h) => h.name + '|' + h.color))
    }
    commit('setRounds', newRounds)
  },
}

const getters = {
  rounds: (s: ProgramsState) => s.rounds,
  byRound: (s: ProgramsState) => (round: number) =>
    s.rounds.find((r) => r.round === round) || null,
  distances: (s: ProgramsState) => s.distances,
}

export default { namespaced: true, state, mutations, actions, getters }
