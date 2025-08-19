import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HorseRacingView',
    component: () => import('../views/HorseRacingView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
