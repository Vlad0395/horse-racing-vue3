<template>
  <div class="horse-list min-w-300 overflow-y-auto">
    <div
      class="horse-list__header d-flex justify-space-between border-radius-2 mb-3 items-center px-4 py-2"
    >
      <h1 class="fs-24">
        Horse List
        <span v-if="horses.length" class="horse-list__count fs-12 py-2"
          >(1 - {{ horses.length }})</span
        >
      </h1>
    </div>
    <Table
      :headers="headers"
      :items="horses"
      noDataText="No horses available"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import horses from '../stores/modules/horses'
import Table from './table/Table.vue'

export default {
  name: 'HorseList',
  components: { Table },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Condition', value: 'condition' },
        { text: 'Color', value: 'color.name' },
      ],
    }
  },
  computed: {
    ...mapState('horses', {
      horses: (state) => state.horses,
      loading: (state) => state.loading,
    }),
  },
}
</script>

<style lang="sass" scoped src="./table/index.sass" />
<style lang="sass" scoped>
.horse-list
  height: calc( 100vh - 120px )
  &__count
    color: #666
  &__header
    background: #f5f5f5
    border-bottom: 1px solid #e0e0e0
    h1
      margin: 0
      color: #333
</style>
