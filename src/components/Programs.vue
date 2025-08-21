<template>
  <div class="program min-w-200 overflow-auto">
    <div
      class="program__header d-flex justify-space-between border-radius-2 mb-3 items-center px-4 py-2"
    >
      <h1 class="fs-24">Programs</h1>
    </div>
    <div>
      <div
        v-for="value in rounds"
        :key="value.round"
        class="program__round border-radius-2"
      >
        <h2 class="fs-16 fw-600 mb-2 p-3">
          Round {{ value.round }}st Lap - {{ value.distance }}m
        </h2>
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
}
</script>

<style lang="sass" scoped>
.program
  height: calc(100vh - 100px)
  width: 'max-content'
  &__round
    background: #fecaca
  &__header
    background: #f5f5f5
    border-bottom: 1px solid #e0e0e0
    h1
      margin: 0
      color: #333
</style>
