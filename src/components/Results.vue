<template>
  <div v-if="races.length" class="results min-w-300 overflow-auto">
    <div
      class="results__header d-flex justify-space-between border-radius-2 mb-3 items-center px-4 py-2"
    >
      <h1 class="fs-24">Results</h1>
    </div>
    <div>
      <div
        v-for="value in races"
        :key="value.id"
        class="results__round border-radius-2 mb-3"
      >
        <h2 class="fs-16 fw-600 mb-2 p-3">
          Round {{ value.programRound }}st Lap - {{ value.distance }}m
        </h2>
        <Table
          :headers="headers"
          :items="
            value?.results?.map((r, index) => ({
              position: r.position,
              name: r.horse.name,
            })) ?? []
          "
          noDataText="No results available"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Table from './table/Table.vue'
export default {
  components: {
    Table,
  },
  data() {
    return {
      headers: [
        { text: 'Position', value: 'position', width: '100px' },
        { text: 'Name', value: 'name' },
      ],
    }
  },
  computed: {
    ...mapState('races', {
      races: (state) => state.races,
    }),
  },
}
</script>

<style lang="sass" scoped>
.results
  height: calc(100vh - 100px)
  &__header
    background: #f5f5f5
    border-bottom: 1px solid #e0e0e0
    h1
      margin: 0
      color: #333
  &__round
    background: #fecaca
</style>
