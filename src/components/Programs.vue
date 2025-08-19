<template>
  <div class="program">
    <div class="program__header">
      <h1>Programs</h1>
    </div>
    <div>
      <div v-for="value in rounds" :key="value.round" class="program__round">
        <h2 class="program__round program__round-title">
          Round {{ value.round }}st Lap - {{ value.distance }}m
        </h2>
        <!-- <p>Distance: {{ value.distance }} meters</p> -->
        <Table
          :headers="headers"
          :items="
            value.horses.map((h, index) => ({
              position: index + 1,
              name: h.name,
            }))
          "
          noDataText="No programs available"
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
    ...mapState('programs', ['rounds', 'distances']),
  },
  methods: {},
  mounted() {
    console.log('rounds :>> ', this.rounds)
    console.log('distances :>> ', this.distances)
  },
}
</script>

<style lang="sass" scoped>
.program
  height: calc(100vh - 100px)
  overflow: auto
  width: 'max-content'
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
</style>
