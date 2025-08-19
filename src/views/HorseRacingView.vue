<template>
  <main class="main">
    <HeaderBar />
    <div class="main__content">
      <HorseList />
      <Racetrack class="main__content-field" />
      <Programs />
      <Results />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import HeaderBar from '../components/HeaderBar.vue'
import HorseList from '../components/horses/List.vue'
import Programs from '../components/Programs.vue'
import Results from '../components/Results.vue'
import Racetrack from '../components/horses/Racetrack.vue'

export default {
  name: 'HorseRacingView',
  components: {
    HeaderBar,
    HorseList,
    Programs,
    Results,
    Racetrack,
  },
}
</script>

<style lang="sass" scoped>
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  width: 100%
  min-height: 100%
  background: #E3E3E3
  overflow-y: auto
  &__content
    display: flex
    justify-content: space-between
    width: 100%
    height: 100%
    padding: 20px
    box-sizing: border-box
    gap: 16px
    &-field
      flex: 1
</style>
