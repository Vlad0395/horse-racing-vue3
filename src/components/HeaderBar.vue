<template>
  <header class="header-bar">
    <h1 class="header-title">
      Horse Racing
    </h1>
    <div class="header-buttons">
      <button class="btn" @click="generateAll">
        Generate program
      </button>
      <button class="btn" @click="runProgramSequence">
        Start/Pause
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
      races: state => state.races
    })
  },
  methods: {
    ...mapActions('programs', ['generateAll', 'regenerateRound']),
    ...mapActions('races', ['runProgramSequence'])
  },
  watch: {
    races: {
      handler(newVal) {
        // Handle changes to the races state
        console.log('newVal :>> ', newVal);
      },
      deep: true
    }
  }
  
}
</script>

<style lang="sass" scoped>
.header
  &-bar
    background-color: #f5f5f5
    padding: 10px 20px
    border-bottom: 1px solid #eee
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
    box-sizing: border-box
    
  &-title
    font-size: 1.5em
    font-weight: bold
    color: #333
  &-buttons
    display: flex
    align-items: center
    gap: 10px
  &-button
    background-color: transparent
    border: none
    cursor: pointer
    padding: 0.5em 1em
    border-radius: 4px
    transition: background-color 0.3s
      
</style>