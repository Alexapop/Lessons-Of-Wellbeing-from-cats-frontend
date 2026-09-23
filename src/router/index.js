import { createRouter, createWebHistory } from 'vue-router'
import HomeSanctuary from '../views/HomeSanctuary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeSanctuary,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router