<template>
  <div class="lane d-grid">
    <div class="lane__number d-flex justify-center items-center fs-14 fw-600">{{ lane.number }}</div>
    <div class="lane__track">
      <div
        v-if="lane.horse"
        class="horse d-flex items-center absolute flex-column"
        :style="horseStyle(lane.horse)"
        :title="lane.horse.name + ' (cond ' + lane.horse.condition + ')'"
      >
        <Icon :color="lane.horse.color.hex" />
        <span class="horse__label fs-12 py-1 px-2 mt-2">{{ lane.horse.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './IconHorse.vue'

export default {
  props: {
    lane: {
      type: Object,
      required: true,
    },
    horseStyle: {
      type: Function,
      required: true,
    },
  },
  components: {
    Icon
  }
}
</script>
