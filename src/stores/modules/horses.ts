import { pickRandomHorses, type HorseBase } from '../../utils'

interface HorsesState {
  horses: HorseBase[]
  loading: boolean
}

const state: HorsesState = { horses: [], loading: false }

const mutations = {
  setHorses(state: HorsesState, horses: HorseBase[]) { state.horses = horses },
  setLoading(state: HorsesState, value: boolean) { state.loading = value }
}

const actions = {
  fetchRandomHorses({ commit }: any, count: number = 20) {
    commit('setLoading', true)
    const horses = pickRandomHorses(count)
    commit('setHorses', horses)
    commit('setLoading', false)
  }
}

const getters = {
  horses: (state: HorsesState) => state.horses,
  loading: (state: HorsesState) => state.loading
}

export default { namespaced: true, state, mutations, actions, getters }