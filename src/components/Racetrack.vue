<template>
  <div
    class="racetrack border-radius-1 d-flex relative overflow-hidden px-3 pb-8 pt-2 flex-column"
  >
    <div class="racetrack__finish-line absolute" ref="finishLineRef" />
    <div class="racetrack__lanes d-grid relative h-100 gap-0">
      <LineTrack
        v-for="lane in lanes"
        :key="(lane as Lane).number"
        class="lane"
        :lane="lane"
        :horseStyle="horseStyle"
      />
    </div>
    <div class="racetrack__footer d-flex justify-space-between items-center fs-14 fw-600 mt-2">
      <span class="lap">{{ lapLabel }}</span>
      <span class="finish-text">FINISH</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import type { HorseBase } from '../utils/horseNames'
import Icon from './IconHorse.vue'
import { useRaceAnimation } from '../composables/useRaceAnimation'
import type { ProgramRound } from '../stores/modules/programs'
import type { Race } from '../stores/modules/races'
import LineTrack from './LineTrack.vue'

interface Lane {
  number: number
  horse?: HorseBase
}
export default defineComponent({
  name: 'Racetrack',
  components: {
    Icon,
    LineTrack,
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
      this.calcFinishPercent()
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
      const left = Math.min(x, this.animParams.liveFinish)
      return { left: `${left}%`, transform: 'translateY(-50%) scaleX(-1)' }
    },

    calcFinishPercent() {
      const track = this.$refs.racetrackRef as HTMLElement | undefined
      const finish = this.$refs.finishLineRef as HTMLElement | undefined
      if (track && finish) {
        const trackRect = (track as any)?.[0].getBoundingClientRect()
        const finishRect = finish.getBoundingClientRect()
        const finishRight = finishRect.right - trackRect.left
        const percent =
          ((finishRight - finishRect.width / 2 - 15) / trackRect.width) * 100
        this.animParams.liveFinish = percent
      }
    },
  },
  unmounted() {
    this.raceAnim?.stop()
  },
})
</script>
