<template>
  <table class="table__container">
    <thead class="table__head">
      <tr class="table__row">
        <th
          v-for="header in headers" :key="header"
          class="table__header"
          :style="{ width: header?.width ?? '100%' }"
        >{{ header.text }}</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <template v-if="items.length">
        <tr v-for="item in items" :key="item.id">
          <td
            v-for="header in headers"
            class="table__cell"
            :style="{ width: header?.width ?? '100%' }"
          >{{ getItemValue(item, header.value) }}</td>
        </tr>
      </template>
      <tr v-else>
        <td class="table__cell" :colspan="headers.length">{{ noDataText }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      headers: { type: Array, required: true },
      items: { type: Array, required: true },
      noDataText: { type: String, default: 'No data available' }
    },
    methods: {
      getItemValue(item, header) {
        // header.value can be a string like 'horse.name'

        if (header.includes('.')) {
          return header.split('.').reduce((obj, prop) => obj && obj[prop], item);
        }
        return item[header];
      }
    }
  }
</script>

<style lang="sass" scoped src="./index.sass"/>