<template>
  <div class="info-panel max-w-200 w-100 overflow-auto">
    <div
      class="info-panel__header bg-panel-gray d-flex justify-space-between border-radius-2 mb-3 items-center px-4 py-2"
    >
      <h1 class="fs-24 text-text-dark m-0">{{ title }}</h1>
    </div>
    <div>
      <div
        v-for="item in items"
        :key="item.id || item.round"
        class="bg-accent border-radius-2 mb-3"
      >
        <h2 class="fs-16 fw-600 mb-2 p-3">
          <slot name="subtitle" :item="item">
            {{ subtitle(item) }}
          </slot>
        </h2>
        <Table
          :headers="headers"
          :items="
            item[`${itemKey}`]?.map((i, index) => ({
              position: i?.position ?? index + 1,
              name: i?.name ?? i.horse?.name,
            })) ?? []
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
    itemKey: { type: String, default: '' },
  },
}
</script>

<style lang="sass" scoped>
.info-panel
  height: calc(100vh - 120px)
  &__header
    border-bottom: 1px solid var(--border-gray)
</style>
