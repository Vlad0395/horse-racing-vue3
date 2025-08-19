<template>
  <div class="racetrack">
    <div class="racetrack__finish-line" />
    <div class="racetrack__lanes">
      <div v-for="lane in lanesForView" :key="lane.number" class="lane">
        <div class="lane__number">{{ lane.number }}</div>
        <div class="lane__track">
          <div
            v-if="lane.horse"
            class="horse"
            :style="{ left: horsePosition(lane.horse) + '%' }"
            :title="lane.horse.name + ' (cond ' + lane.horse.condition + ')'"
          >
            <span class="horse__icon">🐎</span>
            <span class="horse__label">{{ lane.horse.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="racetrack__footer">
      <span class="lap">{{ lapLabel }}</span>
      <span class="finish-text">FINISH</span>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

interface HorseLike {
  name: string
  condition?: string | number
  color?: string
}
interface Lane {
  number: number
  horse?: HorseLike
}

export default defineComponent({
  name: 'Racetrack',
  computed: {
    ...mapGetters({
      races: 'races/races',
      currentRace: 'races/current',
      sequenceRunning: 'races/sequenceRunning',
    }),
    activeRace(): any | null {
      // prefer current active else last finished
      // @ts-ignore
      if (this.currentRace) return this.currentRace
      // @ts-ignore
      const list = this.races as any[]
      return list.length ? list[list.length - 1] : null
    },
    horsesInRace(): HorseLike[] {
      const ar: any = this.activeRace
      return ar && Array.isArray(ar.horses)
        ? (ar.horses as HorseLike[])
        : ([] as HorseLike[])
    },
    lanes(): Lane[] {
      const arr: Lane[] = []
      for (let i = 0; i < 10; i++) {
        const list = this.horsesInRace as unknown as HorseLike[]
        arr.push({ number: i + 1, horse: list[i] })
      }
      return arr
    },
    lanesForView(): any[] {
      return this.lanes as any[]
    },
    lapLabel(): string {
      const ar: any = this.activeRace
      if (!ar) return ''
      const lap = ar.programRound || 1
      const distance = ar.distance || 1200
      return `${lap}.st Lap ${distance}m`
    },
  },
  data() {
    return {
      progressMap: {} as Record<string, number>,
      animTimer: 0 as any,
      showFinishPositions: false,
      postFinishResetDelayMs: 2000,
      afterReset: false,
    }
  },
  watch: {
    horsesInRace: {
      handler() {
        this.initProgress()
      },
      immediate: true,
    },
    currentRace() {
      this.initProgress()
    },
  },
  methods: {
    // Positioning configuration
    startOffset(): number {
      return 1
    }, // лівий край іконки стартує трохи правіше номерів
    liveFinish(): number {
      return 100.8
    }, // максимальна жива позиція (достатньо щоб хвіст перетнув лінію)
    finishClusterBase(): number {
      return 101.4
    }, // де зупиняється переможець (одразу за лінією)
    finishClusterGap(): number {
      return 0.9
    },
    initProgress() {
      // reset for a new race
      this.progressMap = {}
      this.showFinishPositions = false
      this.afterReset = false
      ;(this.horsesInRace as unknown as HorseLike[]).forEach((h: HorseLike) => {
        const key = this.horseKey(h)
        this.progressMap[key] = Math.random() * 10 // start region
      })
      this.startAnimation()
    },
    startAnimation() {
      if (this.animTimer) cancelAnimationFrame(this.animTimer)
      const step = () => {
        const ar: any = this.activeRace
        const now = performance.now()
        let raceStart = 0
        if (ar) {
          raceStart = ar.startedAtPerf || ar._perfStart || (ar._perfStart = now)
          if (!ar.startedAtPerf) ar.startedAtPerf = raceStart
          if (ar.planned && ar.planned.length) {
            // precomputed max time available in ar.simMaxTimeMs if needed for future display
          }
        }
        const elapsed = ar ? now - raceStart : 0
        ;(this.horsesInRace as unknown as HorseLike[]).forEach(
          (h: HorseLike) => {
            const key = this.horseKey(h)
            // If we have planned times, progress = elapsed / horseTime
            let progress = this.progressMap[key] || 0
            if (ar && ar.planned) {
              const planned = ar.planned.find(
                (p: any) => p.horse.name === h.name
              )
              if (planned && planned.timeMs) {
                progress = Math.min(100, (elapsed / planned.timeMs) * 100)
              }
            } else {
              // fallback simple growth
              progress = Math.min(100, progress + 0.4)
            }
            this.progressMap[key] = progress
          }
        )
        // Detect finish -> show final clustering once
        if (
          ar &&
          ar.finishedAt &&
          !this.showFinishPositions &&
          !this.afterReset
        ) {
          this.showFinishPositions = true
          // schedule reset back to start after delay
          setTimeout(() => {
            this.resetToStartPositions()
          }, this.postFinishResetDelayMs)
        }
        this.animTimer = requestAnimationFrame(step)
      }
      this.animTimer = requestAnimationFrame(step)
    },
    resetToStartPositions() {
      this.afterReset = true
      this.showFinishPositions = false
      Object.keys(this.progressMap).forEach((k) => {
        this.progressMap[k] = 0
      })
      if (this.animTimer) cancelAnimationFrame(this.animTimer)
    },
    horseKey(h: HorseLike) {
      return h.name + '|' + (h.color || '')
    },
    horsePosition(h: HorseLike): number {
      const key = this.horseKey(h)
      const val = this.progressMap[key]
      const ar: any = this.activeRace
      if (ar && ar.results) {
        const result = ar.results.find((r: any) => r.horse.name === h.name)
        if (result && this.showFinishPositions) {
          // Map positions to cluster beyond finish line
          return (
            this.finishClusterBase() -
            (result.position - 1) * this.finishClusterGap()
          )
        } else if (result && !this.showFinishPositions) {
          // race finished but already reset => stay at start
          return 0
        }
      }
      if (val == null) return 0
      // Лайв рух: 0..100 -> startOffset .. liveFinish
      const from = this.startOffset()
      const to = this.liveFinish()
      return from + (to - from) * (Math.min(100, val) / 100)
    },
  },
  unmounted() {
    if (this.animTimer) cancelAnimationFrame(this.animTimer)
  },
})
</script>

<style lang="sass" scoped>
.racetrack
  position: relative
  background: #d9d9d9
  padding: 8px 12px 32px
  border-radius: 4px
  flex: 1
  display: flex
  flex-direction: column
  overflow: hidden
  box-shadow: 0 0 0 1px #c5c5c5 inset

  &__lanes
    position: relative
    flex: 1
    display: grid
    grid-template-rows: repeat(10, 1fr)
    gap: 0
    min-height: 420px

  &__finish-line
    position: absolute
    top: 8px
    bottom: 56px
    right: 60px
    width: 3px
    background: #c52a1f
    z-index: 5

  &__footer
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 14px
    font-weight: 600
    color: #b4281d
    margin-top: 8px
    .finish-text
      color: #c52a1f
      letter-spacing: 1px

.lane
  position: relative
  display: grid
  grid-template-columns: 40px 1fr
  border-bottom: 1px dashed #666
  &:first-child
    border-top: 1px dashed #666

  &__number
    background: #3b5f24
    color: #fff
    display: flex
    justify-content: center
    align-items: center
    font-weight: 600
    font-size: 14px
    border-right: 2px solid #fff

  &__track
    position: relative
    padding: 4px 0

.horse
  position: absolute
  top: 50%
  transform: translate(0, -50%)
  display: flex
  flex-direction: column
  align-items: center
  transition: left .4s linear
  pointer-events: none
  &__icon
    font-size: 48px
    line-height: 1
    filter: grayscale(1)
    transform: scaleX(-1)
  &__label
    font-size: 18px
    color: #222
    padding: 1px 4px
    border-radius: 3px
    margin-top: 2px
    white-space: nowrap
</style>
