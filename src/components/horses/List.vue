<template>
  <div class="horse-list">
    <div class="horse-list__header">
      <h1>
        Horse List
        <span v-if="horses.length" class="horse-list__count"
          >(1 - {{ horses.length }})</span
        >
      </h1>
      <button class="btn" @click="fetchRandomHorses(20)">
        {{ horses.length ? 'Refresh' : 'Load Horses' }}
      </button>
    </div>
    <Table
      :headers="headers"
      :items="horses"
      noDataText="No horses available"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import horses from '../../stores/modules/horses'
import Table from '../table/Table.vue'

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
  methods: {
    ...mapActions('horses', ['fetchRandomHorses']),
  },
}
</script>

<style lang="sass" scoped src="../table/index.sass" />
<style lang="sass" scoped>
.horse-list
  min-width: 300px
  &__count
    padding: 8px 0
    font-size: 14px
    color: #666
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
