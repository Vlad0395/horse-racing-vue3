<template>
  <main
    class="main bg-light-gray d-flex flex-column justify-space-between w-100 items-center overflow-y-auto"
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
          <InfoPanel
            :title="'Programs'"
            :items="rounds"
            :headers="programHeaders"
            :noDataText="'No programs available'"
          />
        </template>
        <template #tab-3>
          <InfoPanel
            :title="'Results'"
            :items="races"
            :headers="resultsHeaders"
            :noDataText="'No results available'"
          />
        </template>
      </Tabs>
    </template>
    <div
      v-else
      class="main__content d-flex justify-space-between w-100 gap-4 p-5"
    >
      <HorsesList />
      <Racetrack class="main__content-field" />
      <InfoPanel
        :title="'Programs'"
        :items="rounds"
        :headers="programHeaders"
        :noDataText="'No programs available'"
      />
      <InfoPanel
        :title="'Results'"
        :items="races"
        :headers="resultsHeaders"
        :noDataText="'No results available'"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import HeaderBar from '../components/HeaderBar.vue'
import HorsesList from '../components/HorsesList.vue'
import Racetrack from '../components/Racetrack.vue'
import Tabs from '../components/Tabs.vue'
import { useWindowWidth } from '../composables/useWindowWidth'
import InfoPanel from '../components/InfoPanel.vue'
export default {
  name: 'HorseRacingView',
  components: {
    HeaderBar,
    HorsesList,
    Racetrack,
    Tabs,
    InfoPanel,
  },
  data() {
    return {
      isLessThan: false,
      programHeaders: [
        { text: 'Position', value: 'position', width: '100px' },
        { text: 'Name', value: 'name' },
      ],
      resultsHeaders: [
        { text: 'Position', value: 'position', width: '100px' },
        { text: 'Name', value: 'name' },
      ],
    }
  },
  computed: {
    ...mapState('programs', ['rounds']),
    ...mapState('races', ['races']),
  },
  created() {
    const { isLessThan } = useWindowWidth(1366)
    this.isLessThan = isLessThan
  },
}
</script>

<style lang="sass" scoped>

.main
  min-height: 100vh
  height: calc(100vh - 100px)
  box-sizing: border-box
  overflow-y: auto
  &__content
    min-height: calc(100vh - 100px)
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
