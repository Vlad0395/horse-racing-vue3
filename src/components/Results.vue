<template>
  <div class="results">
    <div class="results__header">
      <h1>Results</h1>
    </div>
    <div>
      <div v-for="value in races" :key="value.id" class="results__round">
        <h2 class="results__round results__round-title">
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
      // results: []
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
  overflow: auto
  &__header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 8px 16px
    border-radius: 8px
    margin-bottom: 12px
    background: #f5f5f5
    border-bottom: 1px solid #e0e0e0
    h1
      margin: 0
      font-size: 24px
      color: #333
  &__round
    background: #fecaca
    border-radius: 8px
    margin-bottom: 12px
    &-title
      font-size: 16px
      font-weight: bold
      margin: 0
      padding: 10px
      margin-bottom: 10px
</style>
