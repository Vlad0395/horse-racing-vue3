<template>
  <div>
    <div class="results__header">
      <h1>Results</h1>

    </div>
    <Table
      :headers="['Position', 'Name']"
      :items="results"
      noDataText="No results available"
    />

  </div>
</template>

<script>
import Table from './table/Table.vue'
export default {
  components: {
    Table
  },
  data() {
    return {
      results: []
    }
  },
  
  methods: {
    
  }
}
</script>

<style lang="sass" scoped>
.results
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