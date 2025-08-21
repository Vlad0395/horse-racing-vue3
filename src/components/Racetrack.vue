<template>
  <div class="racetrack" ref="racetrackRef">
    <div class="racetrack__finish-line" ref="finishLineRef" />
    <div class="racetrack__lanes">
      <div v-for="lane in lanes as Lane[]" :key="lane.number" class="lane">
        <div class="lane__number">{{ lane.number }}</div>
        <div class="lane__track">
          <div
            v-if="lane.horse"
            class="horse"
            :style="horseStyle(lane.horse)"
            :title="lane.horse.name + ' (cond ' + lane.horse.condition + ')'"
          >
            <Icon size="90" :color="lane.horse.color.hex" />
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
import { defineComponent, nextTick } from 'vue'
import { mapGetters, mapState } from 'vuex'
import type { HorseBase } from '../utils/horseNames'
import Icon from './IconHorse.vue'
import { useRaceAnimation } from '../composables/useRaceAnimation'
import type { ProgramRound } from '../stores/modules/programs'
import type { Race } from '../stores/modules/races'

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
      raceAnim: null as ReturnType<typeof useRaceAnimation> | null,
      animParams: {
        startOffset: 1,
        liveFinish: 94.5,
        finishClusterBase: 100,
        finishClusterGap: 1,
      },
      finishPercent: 94.5, // позиція фінішу у %
      resizeHandler: null,
    }
  },
  computed: {
    ...mapGetters({
      currentRace: 'races/current',
    }),
    ...mapState('programs', {
      totalHorsesPerRound: (state: { totalHorsesPerRound: number }) =>
        state.totalHorsesPerRound,
      programRounds: (state: { rounds: ProgramRound[] }): ProgramRound[] =>
        state.rounds,
    }),
    activeRace(): Race | null {
      return (this.currentRace as Race) || null
    },
    previewHorses(): HorseBase[] {
      if (this.activeRace) return []
      if (this.programRounds && (this.programRounds as ProgramRound[]).length)
        return (this.programRounds as ProgramRound[])[0].horses || []
      return []
    },
    horsesInRace(): HorseBase[] {
      if (this.activeRace && Array.isArray((this.activeRace as Race).horses))
        return (this.activeRace as Race).horses
      return this.previewHorses as HorseBase[]
    },
    lanes(): Lane[] {
      const horses: HorseBase[] = this.horsesInRace as HorseBase[]
      return Array.from(Array(this.totalHorsesPerRound), (_, i) => ({
        number: i + 1,
        horse: horses[i],
      }))
    },
    lapLabel(): string {
      if (this.activeRace)
        return `${(this.activeRace as Race).programRound || 1}.st Lap ${(this.activeRace as Race).distance || 1200}m`
      if (this.programRounds && (this.programRounds as ProgramRound[]).length) {
        const first = (this.programRounds as ProgramRound[])[0]
        return `${first.round}.st Lap ${first.distance}m`
      }
      return ''
    },
  },
  created() {
    // @ts-ignore
    this.raceAnim = useRaceAnimation({
      getActiveRace: () => this.activeRace,
      getPlanned: () =>
        this.activeRace ? (this.activeRace as Race).planned || [] : [],
      getHorseKeys: () =>
        (this.horsesInRace as HorseBase[]).map((h) => this.horseKey(h)),
      getPreviewHorseKeys: () =>
        (this.previewHorses as HorseBase[]).map((h) => this.horseKey(h)),
      onFinish: () => {},
      finishDelayMs: this.postFinishResetDelayMs,
    })
    this.initProgress()
  },
  mounted() {
    nextTick(() => {
      this.calcFinishPercent()
      //@ts-ignore
      this.resizeHandler = () => this.calcFinishPercent()
      //@ts-ignore
      window.addEventListener('resize', this.resizeHandler)
    })
  },
  beforeUnmount() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    if (this.raceAnim) this.raceAnim.stop()
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
      if (!this.raceAnim) return
      this.raceAnim.init()
    },
    horseStyle(h: HorseBase) {
      if (!this.raceAnim) return
      const x = this.raceAnim.getHorsePosition(
        h,
        {
          getActiveRace: () => this.activeRace,
          getPlanned: () =>
            this.activeRace ? (this.activeRace as Race).planned || [] : [],
          getHorseKeys: () =>
            (this.horsesInRace as HorseBase[]).map((h) => this.horseKey(h)),
        },
        this.raceAnim.progressMap,
        this.raceAnim.showFinishPositions,
        this.animParams.startOffset,
        this.animParams.liveFinish,
        this.animParams.finishClusterBase,
        this.animParams.finishClusterGap
      )
      // Обмеження: кінь не переходить фінішну лінію
      const left = Math.min(x, this.animParams.liveFinish)
      return { left: `${left}%`, transform: 'translateY(-50%) scaleX(-1)' }
    },

    calcFinishPercent() {
      // Розрахунок позиції фінішу у %
      const track = this.$refs.racetrackRef as HTMLElement | undefined
      const finish = this.$refs.finishLineRef as HTMLElement | undefined
      if (track && finish) {
        const trackRect = track.getBoundingClientRect()
        const finishRect = finish.getBoundingClientRect()
        const finishRight = finishRect.right - trackRect.left
        const percent =
          ((finishRight - finishRect.width / 2) / trackRect.width) * 100
        this.finishPercent = percent
        this.animParams.liveFinish = percent
        console.log('this.animParams.liveFinish', this.animParams.liveFinish)
      }
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
    min-height: 625px
    height: 100%
    box-sizing: border-box
    @media screen and (max-width: 1366px)
      min-height: 420px
      grid-template-rows: repeat(10, 1fr)
    @media screen and (max-width: 600px)
      min-height: 280px
      grid-template-rows: repeat(10, 1fr)
      height: 100%

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
  &__label
    transform: translateY(-50%) scaleX(-1)
    font-size: 12px
    color: #222
    padding: 1px 4px
    white-space: nowrap
    @media screen and (max-width: 1366px)
      position: absolute
      bottom: 0
</style>
