<template>
  <tr class="horse-list__table-row">
    <td class="horse-list__table-cell">{{ horse.name }}</td>
    <td class="horse-list__table-cell">{{ horse.condition }}</td>
    <td class="horse-list__table-cell">{{ horse.color }}</td>
  </tr>
</template>

<script>
  export default {
    props: {
      horse: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style lang="sass" scoped>
.horse-list__table-row
  &:nth-child(even)
    background-color: #f9f9f9

.horse-list__table-cell
  padding: 12px 16px
  border-bottom: 1px solid #e0e0e0
  font-size: 16px
  color: #333
</style>