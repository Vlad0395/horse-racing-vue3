<template>
  <div class="tabs w-100 d-flex flex-column px-3">
    <div class="tab-headers bg-panel-gray d-flex w-100 border-radius-2 my-3 overflow-hidden">
      <button
        v-for="(tab, idx) in tabs"
        :key="idx"
        :class="[
          'fs-16 fw-600 border-radius-2 m-1 cursor-pointer py-2',
          { active: idx === activeTab },
        ]"
        @click="activeTab = idx"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content w-100 d-flex flex-column">
      <slot :name="'tab-' + activeTab"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    labels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 1,
    }
  },
  computed: {
    tabs() {
      return this.labels
    },
  },
  methods: {
    switchTab(index) {
      this.activeTab = index
    },
  },
}
</script>

<style scoped>
.tabs {
  flex: 1 1 0;
  min-height: 0;
  box-sizing: border-box;
}
.tab-headers {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.tab-headers button {
  flex: 1 1 0;
  color: var(--text-gray);
  background: transparent;
  border: none;
  outline: none;
  transition:
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
}
.tab-headers button.active {
  background: var(--white);
  color: #222;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.tab-content {
  flex: 1 1 0;
  min-height: 0;
}
</style>
