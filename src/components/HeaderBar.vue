<template>
  <header
    class="header-bar w-100 d-flex justify-space-between items-center px-5 py-3"
  >
    <h1 class="header-title fs-24 fw-600">Horse Racing</h1>
    <div class="header-buttons d-flex items-center gap-3">
      <button
        class="btn bg-primary border-radius-1 border-none px-4 py-2 text-white"
        :disabled="active || races.length >= 5"
        @click="generateAll"
      >
        Generate program {{ races.length }}
      </button>
      <button
        v-if="active"
        class="btn bg-secondary border-radius-1 border-none px-4 py-2 text-white"
        @click="cancelProgramSequence"
      >
        Cancel
      </button>
      <button
        v-else
        class="btn bg-primary border-radius-1 border-none px-4 py-2 text-white"
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
    background-color: #f5f5f5
    border-bottom: 1px solid #eee
    box-sizing: border-box

  &-title
    color: #333
  &-buttons
    gap: 10px
  &-button
    background-color: transparent
    border: none
    cursor: pointer
    padding: 0.5em 1em
    border-radius: 4px
    transition: background-color 0.3s
</style>
