<template>
  <main class="main">
    <HeaderBar />
    <div class="main__content">
      <HorseList />
      <div class="main__content-field"> field with horses</div>
      <Programs />
      <Results />
    </div>
  </main>
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue'
import HorseList from '../components/horses/List.vue'
import Programs from '../components/Programs.vue'
import Results from '../components/Results.vue'

export default {
  name: 'HorseRacingView',
  components: {
    HeaderBar,
    HorseList,
    Programs,
    Results
  }
}
</script>

<style lang="sass" scoped>
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  width: 100%
  min-height: 100%
  background: #E3E3E3
  overflow-y: auto
  &__content
    display: flex
    justify-content: space-between
    width: 100%
    height: 100%
    padding: 20px
    box-sizing: border-box
    gap: 16px
    &-field
      flex: 1
    // & > div
    //   // flex: 1
    //   margin: 0 10px
</style>