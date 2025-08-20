<template>
  <div class="racetrack">
    <div class="racetrack__finish-line" />
    <div class="racetrack__lanes">
      <div v-for="lane in lanes" :key="lane.number" class="lane">
        <div class="lane__number">{{ lane.number }}</div>
        <div class="lane__track">
          <div
            v-if="lane.horse"
            class="horse"
            :style="horseStyle(lane.horse)"
            :title="lane.horse.name + ' (cond ' + lane.horse.condition + ')'"
          >
            <!-- <span class="horse__icon">🐎</span> -->
            <Icon name="horse" size="90" :color="lane.horse.color.hex" />
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
//@ts-nocheck
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import type { HorseBase } from '../../utils/horseNames'
import Icon from '../Icon.vue'
import { useRaceAnimation } from '../../composables/useRaceAnimation'

interface Lane {
  number: number
  horse?: HorseBase
}
export default defineComponent({
  name: 'Racetrack',
  components: {
    Icon,
  },
  data() {
    return {
      postFinishResetDelayMs: 1500,
      raceAnim: null as any,
      animParams: {
        startOffset: 1,
        liveFinish: 95,
        finishClusterBase: 100,
        finishClusterGap: 1,
      },
    }
  },
  computed: {
    ...mapGetters({
      currentRace: 'races/current',
      programRounds: 'programs/rounds',
    }),
    ...mapState('programs', {
      totalHorsesPerRound: (state) => state.totalHorsesPerRound,
    }),
    activeRace() {
      return this.currentRace || null
    },
    previewHorses(): HorseBase[] {
      if (this.activeRace) return []
      if (this.programRounds && this.programRounds.length)
        return this.programRounds[0].horses || []
      return []
    },
    horsesInRace(): HorseBase[] {
      if (this.activeRace && Array.isArray(this.activeRace.horses))
        return this.activeRace.horses
      return this.previewHorses
    },
    lanes(): Lane[] {
      return Array.from({ length: this.totalHorsesPerRound }, (_, i) => ({
        number: i + 1,
        horse: this.horsesInRace[i],
      }))
    },
    lapLabel(): string {
      if (this.activeRace)
        return `${this.activeRace.programRound || 1}.st Lap ${this.activeRace.distance || 1200}m`
      if (this.programRounds && this.programRounds.length) {
        const first = this.programRounds[0]
        return `${first.round}.st Lap ${first.distance}m`
      }
      return ''
    },
  },
  created() {
    this.raceAnim = useRaceAnimation({
      getActiveRace: () => this.activeRace,
      getPlanned: () => (this.activeRace ? this.activeRace.planned || [] : []),
      getHorseKeys: () => this.horsesInRace.map((h) => this.horseKey(h)),
      getPreviewHorseKeys: () =>
        this.previewHorses.map((h) => this.horseKey(h)),
      onFinish: () => {},
      finishDelayMs: this.postFinishResetDelayMs,
    })
    this.initProgress()
  },
  watch: {
    horsesInRace() {
      if (!this.raceAnim) return
      this.initProgress()
    },
    currentRace() {
      if (!this.raceAnim) return
      this.initProgress()
    },
    programRounds() {
      if (!this.activeRace) {
        if (!this.raceAnim) return
        this.initProgress()
      }
    },
  },
  methods: {
    horseKey(h: HorseBase) {
      return `${h.name}|${h.color?.hex ?? h.color ?? ''}`
    },
    initProgress() {
      this.raceAnim.init()
    },
    horseStyle(h: HorseBase) {
      const x = this.raceAnim.getHorsePosition(
        h,
        {
          getActiveRace: () => this.activeRace,
        },
        this.raceAnim.progressMap,
        this.raceAnim.showFinishPositions,
        this.animParams.startOffset,
        this.animParams.liveFinish,
        this.animParams.finishClusterBase,
        this.animParams.finishClusterGap
      )
      return { left: `${x}%`, transform: 'translateY(-50%) scaleX(-1)' }
    },
  },
  unmounted() {
    this.raceAnim?.stop()
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
  left: 0
  transform: translateY(-50%) scaleX(-1)
  will-change: left
  display: flex
  flex-direction: column
  align-items: center
  pointer-events: none
  &__icon
    font-size: 40px
    line-height: 1
    filter: grayscale(1)
  &__label
    font-size: 12px
    color: #222
    padding: 1px 4px
    border-radius: 3px
    margin-top: 2px
    white-space: nowrap
</style>
