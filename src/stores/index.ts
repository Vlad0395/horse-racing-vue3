import { createStore } from 'vuex'
import horses from './modules/horses'
import races from './modules/races'
import bets from './modules/bets'

// Root store without generics (simplified)
export default createStore({
  modules: { horses, races, bets }
})