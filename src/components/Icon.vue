<template>
  <i :style="getIconStyles()" class="custom-svg-icon transition-colors" />
</template>

<script>
export default {
  name: 'CustomSvgIcon',
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: null },
    color: { type: String, default: null },
  },
  methods: {
    getIconStyles() {
      const url = new URL(`../assets/icons/${this.name}.svg`, import.meta.url)
        .href
      let styles = `--icon-url: url(${url});`

      if (this.size) {
        styles += ` --icon-size: ${this.size}px;`
      }
      if (this.color) {
        styles += ` --icon-color: ${this.color};`
      }

      return styles
    },
  },
}
</script>

<style lang="sass" scoped>
// .custom-svg-icon
//   &::before
//     width: var(--icon-size, 1.25rem)
//     height: var(--icon-size, 1.25rem)
//     display: block
//     content: ''
//     background: var(--icon-color, currentColor)
//     -webkit-mask-size: contain
//     mask-size: contain
//     -webkit-mask: var(--icon-url) no-repeat center
//     mask: var(--icon-url) no-repeat center
.custom-svg-icon
  &::before
    width: var(--icon-size, 2rem)   // розмір блока
    height: var(--icon-size, 2rem)
    display: block
    content: ''
    background-color: var(--icon-color, currentColor)

    /* Маска */
    -webkit-mask-image: var(--icon-url)
    mask-image: var(--icon-url)

    -webkit-mask-repeat: no-repeat
    mask-repeat: no-repeat

    -webkit-mask-position: center
    mask-position: center

    -webkit-mask-size: 100% 100%   // 🔑 розтягує по всьому блоку
    mask-size: 100% 100%
</style>
