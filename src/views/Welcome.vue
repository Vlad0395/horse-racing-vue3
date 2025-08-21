<template>
  <div class="container">
    <h1 class="title">Welcome to the Horse Racing Main Page!</h1>
    <img
      class="banner"
      src="/src/assets/banner-horse.webp"
      alt="Welcome to horse racing"
    />
    <router-link class="start-btn" to="/racing">Start Race</router-link>
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
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  height: 100vh
  background: linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)

.title
  font-size: 2.5rem
  color: #2d3436
  margin-bottom: 30px
  animation: fadeIn 1s ease
  @media screen and (max-width: 768px)
    font-size: 24px
    text-align: center
    max-width: 300px
.banner
  border-radius: 20px
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.15)
  margin-bottom: 30px
  animation: bounce 2s infinite
  width: 500px
  height: 400px
  @media screen and (max-width: 768px)
    width: 100%
    height: auto

.start-btn
  padding: 15px 40px
  font-size: 1.2rem
  color: #fff
  background: linear-gradient(90deg, #43c6ac 0%, #191654 100%)
  border: none
  border-radius: 30px
  cursor: pointer
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.12)
  transition: background 0.3s
  animation: fadeIn 1.5s ease
  &:hover
    background: linear-gradient(90deg, #191654 0%, #43c6ac 100%)
</style>
