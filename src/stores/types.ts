// Central type definitions for Vuex modules
export interface Bet {
  id: number
  amount: number
  horse: string
  placedAt: number
}

export interface BetsState {
  bets: Bet[]
}

export interface Horse {
  name: string
  condition: string
  color: string
}

export interface HorsesState {
  horses: Horse[]
  loading: boolean
}

export interface Race {
  id: number
  startedAt: number
  finishedAt?: number
}

export interface RacesState {
  currentRaceId: number | null
  races: Race[]
  active: boolean
}

export interface RootState {
  bets: BetsState
  horses: HorsesState
  races: RacesState
}
