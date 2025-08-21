<template>
  <div class="info-panel min-w-200 overflow-auto">
    <div
      class="info-panel__header d-flex justify-space-between border-radius-2 mb-3 items-center px-4 py-2"
    >
      <h1 class="fs-24">{{ title }}</h1>
    </div>
    <div>
      <div
        v-for="item in items"
        :key="itemKey(item)"
        class="info-panel__round border-radius-2 mb-3"
      >
        <h2 class="fs-16 fw-600 mb-2 p-3">
          <slot name="subtitle" :item="item">
            {{ subtitle(item) }}
          </slot>
        </h2>
        <Table
          :headers="headers"
          :items="
            item[`${item.horses ? 'horses' : 'results'}`].map((i, index) => ({
              position: i?.position ?? index + 1,
              name: i.name,
            }))
          "
          :noDataText="noDataText"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from './Table.vue'
export default {
  name: 'InfoPanel',
  components: { Table },
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
    headers: { type: Array, required: true },
    noDataText: { type: String, default: 'No data available' },
    subtitle: { type: Function, default: () => '' },
    itemKey: { type: Function, default: (item) => item.id || item.round },
  },
}
</script>

<style lang="sass" scoped>
.info-panel
  height: calc(100vh - 120px)
  &__header
    background: #f5f5f5
    border-bottom: 1px solid #e0e0e0
    h1
      margin: 0
      color: #333
  &__round
    background: #fecaca
</style>
