<template>
  <div class="tabs">
    <div class="tab-headers">
      <button
        v-for="(tab, idx) in tabs"
        :key="idx"
        :class="{ active: idx === activeTab }"
        @click="activeTab = idx"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
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
      activeTab: 0,
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
  width: 100%;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0 12px;
  box-sizing: border-box;
}
.tab-headers {
  display: flex;
  width: 100%;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  overflow: hidden;
  margin: 12px 0;
}
.tab-headers button {
  flex: 1 1 0;
  margin: 4px;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #757575;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 8px;
}
.tab-headers button.active {
  background: #fff;
  color: #222;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.tab-content {
  width: 100%;
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
