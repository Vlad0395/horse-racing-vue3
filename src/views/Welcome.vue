<template>
  <div class="d-flex flex-column container items-center justify-center">
    <h1 class="title text-dark fs-40 mb-8">Welcome to the Horse Racing Main Page!</h1>
    <img
      class="banner border-radius-5"
      src="/src/assets/banner-horse.webp"
      alt="Welcome to horse racing"
    />
    <router-link
      class="start-btn text-white fs-16 border-radius-5 cursor-pointer px-10 py-4"
      to="/racing"
      >Start Race</router-link
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'Welcome',
}
</script>

<style lang="sass" scoped>
@keyframes fadeIn
  from
    opacity: 0
    transform: translateY(-30px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes bounce
  0%, 100%
    transform: translateY(0)
  50%
    transform: translateY(-20px)

.container
  height: 100vh
  background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)

.title
  animation: fadeIn 1s ease
  @media screen and (max-width: 768px)
    font-size: 24px
    text-align: center
    max-width: 300px
.banner
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.15)
  animation: bounce 2s infinite
  width: 500px
  height: 400px
  @media screen and (max-width: 768px)
    width: 100%
    height: auto

.start-btn
  background: linear-gradient(90deg, var(--primary) 0%, var(--deep-blue) 100%)
  border: none
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.12)
  transition: background 0.3s
  animation: fadeIn 1.5s ease
  &:hover
    background: linear-gradient(90deg, var(--deep-blue) 0%, var(--primary) 100%)
</style>
