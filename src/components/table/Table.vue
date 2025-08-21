<template>
  <table class="table__container w-100 border-radius-2 overflow-hidden">
    <thead class="table__head">
      <tr class="table__row">
        <th
          v-for="header in headers"
          :key="header"
          class="table__header px-4 py-3 text-left fw-600"
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
            class="table__cell px-4 py-3 fs-16"
            :style="{ width: header?.width ?? '100%' }"
          >
            {{ getItemValue(item, header.value) }}
          </td>
        </tr>
      </template>
      <tr v-else>
        <td class="table__cell px-4 py-3 fs-16 text-center" :colspan="headers.length">{{ noDataText }}</td>
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

<style lang="sass" scoped src="./index.sass" />
