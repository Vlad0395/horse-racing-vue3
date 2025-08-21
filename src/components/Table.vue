<template>
  <table class="table__container w-100 border-radius-2 overflow-hidden">
    <thead class="table__head">
      <tr class="table__row">
        <th
          v-for="header in headers"
          :key="header"
          class="table__header fw-600 px-4 py-3 text-left"
          :style="{ width: header?.width ?? '100%' }"
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <template v-if="items.length">
        <tr v-for="item in items" :key="item.id">
          <td
            v-for="header in headers"
            class="table__cell fs-16 px-4 py-3"
            :style="{ width: header?.width ?? '100%' }"
          >
            {{ getItemValue(item, header.value) }}
          </td>
        </tr>
      </template>
      <tr v-else>
        <td
          class="table__cell fs-16 px-4 py-3 text-center"
          :colspan="headers.length"
        >
          {{ noDataText }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    noDataText: { type: String, default: 'No data available' },
  },
  methods: {
    getItemValue(item, header) {
      if (header.includes('.')) {
        return header.split('.').reduce((obj, prop) => obj && obj[prop], item)
      }
      return item[header]
    },
  },
}
</script>

<style lang="sass" scoped>
.table
  &__container
    border-collapse: separate
    border-spacing: 0
    box-shadow: 0 2px 8px rgba(0,0,0,0.08)
  &__head
    background: #f5f5f5
  &__header
    border-bottom: 2px solid #e0e0e0
  &__row
    &:first-child
      .table__header
        &:first-child
          border-top-left-radius: 8px
        &:last-child
          border-top-right-radius: 8px
    &:last-child
      td
        &:first-child
          border-bottom-left-radius: 8px
        &:last-child
          border-bottom-right-radius: 8px
  &__cell
    border-bottom: 1px solid #e0e0e0
    color: #333
  &__body
    background: #fff
  &__count
    color: #666
</style>
