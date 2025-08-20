interface Race {
  id: number
  startedAt: number
  finishedAt?: number
  programRound?: number
  distance?: number
  horses?: any[]
  results?: RaceResult[]
  planned?: RaceResult[] // precomputed order & times (used during animation)
  simMaxTimeMs?: number // longest horse time used for scheduling
}

interface RaceResult {
  horse: any
  position: number
  timeMs?: number
}

// Helper: compute race results based on horse condition (higher condition => better expected performance)
function computeResultsByCondition(
  horses: any[] = [],
  distance?: number
): RaceResult[] {
  if (!horses.length) return []
  // Parse numeric condition (fallback 50) and keep original ref
  const enriched = horses.map((h) => {
    const cRaw = (h && (h.condition ?? h.conditional ?? h.power)) as
      | string
      | number
      | undefined
    const c = typeof cRaw === 'number' ? cRaw : parseFloat(String(cRaw || '0'))
    return { ref: h, condition: isFinite(c) ? c : 50 }
  })
  const minC = Math.min(...enriched.map((e) => e.condition))
  const maxC = Math.max(...enriched.map((e) => e.condition))
  // Base time: scale roughly with distance. 1200m ≈ 60s baseline.
  const baseDistance = 1200
  const baseTimeMs = 60000 * (distance ? distance / baseDistance : 1)
  const spreadFactor = 0.1 // up to 10% improvement window for best vs worst
  const jitterFactor = 0.02 // +/-2% random jitter
  const denom = maxC - minC || 1
  const computed = enriched.map((e) => {
    const normalized = (e.condition - minC) / denom // 0..1
    const performanceBonus = spreadFactor * normalized // 0..0.10
    const jitter = (Math.random() * 2 - 1) * jitterFactor // -0.02..0.02
    const timeMultiplier = 1 - performanceBonus + jitter
    const rawTime = baseTimeMs * timeMultiplier
    return { horse: e.ref, timeMs: Math.max(5000, Math.round(rawTime)) } // clamp min 5s
  })
  // Sort by ascending time (faster first); tie‑break randomly
  computed.sort((a, b) => a.timeMs - b.timeMs || Math.random() - 0.5)
  return computed.map((c, idx) => ({
    horse: c.horse,
    position: idx + 1,
    timeMs: c.timeMs,
  }))
}

interface RacesState {
  currentRaceId: number | null
  races: Race[]
  active: boolean
  sequenceRunning: boolean
  currentRoundIndex: number | null
  sequenceTimerId: number | null
  gapMs: number
  raceDurationMs: number
}

const state: RacesState = {
  currentRaceId: null,
  races: [],
  active: false,
  sequenceRunning: false,
  currentRoundIndex: null,
  sequenceTimerId: null,
  gapMs: 10000, // 10s pause between races
  raceDurationMs: 0, // 0 = instant finish (can adjust later)
}

const mutations = {
  startRace(state: RacesState, payload?: Partial<Race>) {
    if (state.active) return
    const id = state.races.length
      ? state.races[state.races.length - 1].id + 1
      : 1
    const race: Race = { id, startedAt: Date.now(), ...payload }
    // Precompute planned results (times + positions) for animation if horses provided.
    if (race.horses && race.horses.length) {
      const planned = computeResultsByCondition(
        race.horses as any[],
        race.distance
      )
      race.planned = planned
      race.simMaxTimeMs = Math.max(...planned.map((p) => p.timeMs || 0))
    }
    state.races.push(race)
    state.currentRaceId = id
    state.active = true
  },
  finishRace(state: RacesState) {
    if (!state.active || state.currentRaceId == null) return
    const race = state.races.find((r) => r.id === state.currentRaceId)
    if (race && !race.finishedAt) {
      race.finishedAt = Date.now()
      // If we already planned, just finalize with planned array; else compute now.
      if (race.planned && race.planned.length) {
        race.results = race.planned
      } else if (!race.results || !race.results.length) {
        race.results = computeResultsByCondition(
          race.horses as any[],
          race.distance
        )
      }
    }
    state.active = false
    state.currentRaceId = null
  },
  setSequenceRunning(state: RacesState, val: boolean) {
    state.sequenceRunning = val
  },
  setCurrentRoundIndex(state: RacesState, idx: number | null) {
    state.currentRoundIndex = idx
  },
  setSequenceTimer(state: RacesState, id: number | null) {
    state.sequenceTimerId = id
  },
  setGap(state: RacesState, ms: number) {
    state.gapMs = ms
  },
  setRaceDuration(state: RacesState, ms: number) {
    state.raceDurationMs = ms
  },
}

const actions = {
  toggleRace({ state, commit }: any) {
    if (state.active) commit('finishRace')
    else commit('startRace')
  },
  runProgramSequence({ state, commit, dispatch, rootGetters }: any) {
    const rounds = rootGetters['programs/rounds']
    if (!rounds || !rounds.length) {
      if (dispatch) {
        dispatch('programs/generateAll', null, { root: true })
      }
    }
    const updatedRounds = rootGetters['programs/rounds']
    if (!updatedRounds || !updatedRounds.length) return
    if (state.sequenceRunning) return
    commit('setSequenceRunning', true)
    commit('setCurrentRoundIndex', 0)
    dispatch('_advanceSequence')
  },
  cancelProgramSequence({
    state,
    commit,
  }: {
    state: RacesState
    commit: Function
  }) {
    if (state.sequenceTimerId) {
      clearTimeout(state.sequenceTimerId)
      commit('setSequenceTimer', null)
    }
    if (state.active) commit('finishRace')
    commit('setSequenceRunning', false)
    commit('setCurrentRoundIndex', null)
  },
  _advanceSequence({ state, commit, dispatch, rootGetters }: any) {
    const rounds = rootGetters['programs/rounds'] || []
    const idx = state.currentRoundIndex
    if (idx == null) return
    if (idx >= rounds.length) {
      commit('setSequenceRunning', false)
      commit('setCurrentRoundIndex', null)
      commit('setSequenceTimer', null)
      return
    }
    const round = rounds[idx]
    // start race with round metadata
    commit('startRace', {
      programRound: round.round,
      distance: round.distance,
      horses: round.horses,
    })
    // Determine duration: explicit override or simulated max time.
    let duration = state.raceDurationMs
    if (!duration) {
      // look up active race (last one)
      const race = state.races[state.races.length - 1]
      duration = race?.simMaxTimeMs || 0
    }
    // Minimum duration fallback
    if (!duration || duration < 3000) duration = 3000
    const finalize = () => {
      commit('finishRace')
      const nextIdx = idx + 1
      commit('setCurrentRoundIndex', nextIdx)
      const timer = setTimeout(() => {
        dispatch('_advanceSequence')
      }, state.gapMs)
      commit('setSequenceTimer', timer as unknown as number)
    }
    setTimeout(finalize, duration)
  },
}

const getters = {
  active: (state: RacesState) => state.active,
  races: (state: RacesState) => state.races,
  current: (state: RacesState) =>
    state.races.find((r) => r.id === state.currentRaceId) || null,
  sequenceRunning: (state: RacesState) => state.sequenceRunning,
  currentRoundIndex: (state: RacesState) => state.currentRoundIndex,
  gapMs: (state: RacesState) => state.gapMs,
}

export default { namespaced: true, state, mutations, actions, getters }
