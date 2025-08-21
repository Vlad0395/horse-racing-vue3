<template>
  <main
    class="main d-flex justify-space-between w-100 items-center overflow-y-auto"
  >
    <HeaderBar />
    <template v-if="isLessThan">
      <Tabs :labels="['Horse List', 'Track', 'Programs', 'Results']">
        <template #tab-0>
          <HorsesList />
        </template>
        <template #tab-1>
          <Racetrack />
        </template>
        <template #tab-2>
          <Programs />
        </template>
        <template #tab-3>
          <Results />
        </template>
      </Tabs>
    </template>
    <div
      v-else
      class="main__content d-flex justify-space-between w-100 gap-4 p-5"
    >
      <HorsesList />
      <Racetrack class="main__content-field" />
      <Programs />
      <Results />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import HeaderBar from '../components/HeaderBar.vue'
import HorsesList from '../components/HorsesList.vue'
import Programs from '../components/Programs.vue'
import Results from '../components/Results.vue'
import Racetrack from '../components/Racetrack.vue'
import Tabs from '../components/tabs/index.vue'
import { useWindowWidth } from '../composables/useWindowWidth'
export default {
  name: 'HorseRacingView',
  components: {
    HeaderBar,
    HorsesList,
    Programs,
    Results,
    Racetrack,
    Tabs,
  },
  data() {
    return {
      isLessThan: false,
    }
  },
  created() {
    const { isLessThan } = useWindowWidth(1366)
    this.isLessThan = isLessThan
  },
}
</script>

<style lang="sass" scoped>

.main
  flex-direction: column
  min-height: 100vh
  height: calc(100vh - 100px)
  background: #E3E3E3
  box-sizing: border-box
  overflow-y: auto
  &__content
    height: 100%
    min-height: 100vh
    box-sizing: border-box

    &-field
      flex: 1
  > .tabs
    flex: 1
    display: flex
    flex-direction: column
    min-height: 0
    .tab-content
      flex: 1
      min-height: 0
</style>
