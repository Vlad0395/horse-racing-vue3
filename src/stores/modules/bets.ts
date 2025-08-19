// Simplified module (no Vuex generic types) to avoid TS namespace issues
interface Bet {
  id: number
  amount: number
  horse: string
  placedAt: number
}

interface BetsState {
  bets: Bet[]
}

const state: BetsState = { bets: [] }

const mutations = {
  addBet(state: BetsState, bet: Bet) {
    state.bets.push(bet)
  },
  clearBets(state: BetsState) {
    state.bets = []
  },
  removeBet(state: BetsState, id: number) {
    state.bets = state.bets.filter((b) => b.id !== id)
  },
}

const actions = {
  placeBet({ commit, state }: any, payload: { amount: number; horse: string }) {
    const bet: Bet = {
      id: state.bets.length ? state.bets[state.bets.length - 1].id + 1 : 1,
      amount: payload.amount,
      horse: payload.horse,
      placedAt: Date.now(),
    }
    commit('addBet', bet)
  },
}

const getters = {
  totalAmount(state: BetsState) {
    return state.bets.reduce((sum, b) => sum + b.amount, 0)
  },
  betCount(state: BetsState) {
    return state.bets.length
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
