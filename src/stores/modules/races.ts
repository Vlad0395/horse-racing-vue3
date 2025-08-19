interface Race { id: number; startedAt: number; finishedAt?: number }
interface RacesState { currentRaceId: number | null; races: Race[]; active: boolean }

const state: RacesState = { currentRaceId: null, races: [], active: false }

const mutations = {
	startRace(state: RacesState) {
		if (state.active) return
		const id = state.races.length ? state.races[state.races.length - 1].id + 1 : 1
		const race: Race = { id, startedAt: Date.now() }
		state.races.push(race)
		state.currentRaceId = id
		state.active = true
	},
	finishRace(state: RacesState) {
		if (!state.active || state.currentRaceId == null) return
		const race = state.races.find(r => r.id === state.currentRaceId)
		if (race && !race.finishedAt) race.finishedAt = Date.now()
		state.active = false
		state.currentRaceId = null
	}
}

const actions = {
	toggleRace({ state, commit }: any) {
		if (state.active) commit('finishRace')
		else commit('startRace')
	}
}

const getters = {
	active: (state: RacesState) => state.active,
	races: (state: RacesState) => state.races,
	current: (state: RacesState) => state.races.find(r => r.id === state.currentRaceId) || null
}

export default { namespaced: true, state, mutations, actions, getters }
