<template>
  <header
    class="header-bar bg-panel-gray w-100 d-flex justify-space-between items-center px-5 py-3"
  >
    <h1 class="header-title text-text-dark fs-24 fw-600">Horse Racing</h1>
    <div class="header-buttons d-flex gap-3 items-center">
      <button
        class="btn bg-primary border-radius-1 fs-16 border-none px-4 py-2 text-white cursor-pointer"
        :disabled="races.length !== rounds.length"
        @click="generateAll"
      >
        Generate program
      </button>
      <button
        v-if="active || (races.length > 0 && races.length !== rounds.length)"
        class="btn bg-deep-blue border-radius-1 fs-16 border-none px-4 py-2 text-white cursor-pointer"
        @click="cancelProgramSequence"
      >
        Cancel
      </button>
      <button
        v-else
        class="btn bg-primary border-radius-1 fs-16 border-none px-4 py-2 text-white cursor-pointer"
        :disabled="races.length !== 0"
        @click="runProgramSequence"
      >
        Start
      </button>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HeaderBar',
  computed: {
    ...mapState('races', {
      races: (state) => state.races,
      active: (state) => state.active,
    }),
    ...mapState('programs', {
      rounds: (state) => state.rounds,
    }),
  },
  methods: {
    ...mapActions('programs', ['generateAll']),
    ...mapActions('races', ['runProgramSequence', 'cancelProgramSequence']),
  },
}
</script>

<style lang="sass" scoped>
.header
  &-bar
    border-bottom: 1px solid var(--border-gray)
    box-sizing: border-box
    @media screen and (max-width: 375px)
      padding: 8px 24px
      flex-direction: column
      align-items: flex-start
  &-buttons
    @media screen and (max-width: 375)
      flex-direction: column
      width: 100%
  &-button
    background-color: transparent
    border: none
    transition: background-color 0.3s
</style>
