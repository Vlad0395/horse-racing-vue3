import type { HorseBase } from '../../utils'

export interface RaceAnimationState {
  progressMap: Record<string, number>
  animFrameId: number | null
  racePerfStart: Record<string, number>
}

const state: RaceAnimationState = {
  progressMap: {},
  animFrameId: null,
  racePerfStart: {},
}

const mutations = {
  RESET_PROGRESS(state: RaceAnimationState, horseKeys: string[]) {
    state.progressMap = {}
    horseKeys.forEach((key) => {
      state.progressMap[key] = 0
    })
  },
  UPDATE_PROGRESS(
    state: RaceAnimationState,
    { id, value }: { id: string; value: number }
  ) {
    state.progressMap[id] = value
  },
  SET_ANIM_FRAME_ID(state: RaceAnimationState, id: number | null) {
    state.animFrameId = id
  },
  SET_RACE_PERF_START(
    state: RaceAnimationState,
    { raceId, value }: { raceId: string; value: number }
  ) {
    state.racePerfStart[raceId] = value
  },
}

const actions = {
  init({ commit, dispatch }: any, opts: any) {
    commit('RESET_PROGRESS', opts.horseKeys)
    commit('SET_ANIM_FRAME_ID', null)
    dispatch('startLoop', { ...opts })
  },
  updateProgress({ commit }: any, payload: { id: string; value: number }) {
    commit('UPDATE_PROGRESS', payload)
  },
  setAnimFrameId({ commit }: any, id: number | null) {
    commit('SET_ANIM_FRAME_ID', id)
  },
  setRacePerfStart(
    { commit }: any,
    payload: { raceId: string; value: number }
  ) {
    commit('SET_RACE_PERF_START', payload)
  },
  startLoop({ commit, state }: any, opts: any) {
    const step = () => {
      const race = opts.getActiveRace()
      if (race && race.planned) {
        const now = performance.now()
        let start = state.racePerfStart[race.id]
        if (start === null || start === undefined) {
          start = now
          commit('SET_RACE_PERF_START', { raceId: race.id, value: start })
        }
        const elapsed = now - start
        for (const p of race.planned) {
          if (!p?.horse?.id) continue
          const pct = Math.min(100, (elapsed / p.timeMs) * 100)
          commit('UPDATE_PROGRESS', { id: p.horse.id, value: pct })
        }
        commit('SET_ANIM_FRAME_ID', requestAnimationFrame(step))
        return
      }
    }
    commit('SET_ANIM_FRAME_ID', requestAnimationFrame(step))
  },
}

const getters = {
  progressMap: (state: RaceAnimationState) => state.progressMap,
  animFrameId: (state: RaceAnimationState) => state.animFrameId,
  horsePosition:
    (state: RaceAnimationState) =>
    (h: HorseBase, startOffset = 1, liveFinish = 95) => {
      if (!h) return startOffset
      const val = state.progressMap[h.id]
      if (val == null) return startOffset
      const from = startOffset
      const to = liveFinish
      const position =
        from + (to - from) * (Math.min(100, Math.max(0, val)) / 100)
      return position
    },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
