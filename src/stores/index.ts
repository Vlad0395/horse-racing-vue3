import { createStore } from 'vuex'
import horses from './modules/horses'
import races from './modules/races'
import bets from './modules/bets'
import programs from './modules/programs'
import raceAnimation from './modules/race-animation'


// Root store without generics (simplified)
export default createStore({
  modules: { horses, races, bets, programs, raceAnimation },
})
