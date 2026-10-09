import { createRouter, createWebHistory } from 'vue-router'
import HomeSanctuary from '../views/HomeSanctuary.vue'
import ClassCalendar from '@/views/ClassCalendar.vue'
import WellbeingLessons from '@/views/WellbeingLessons.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeSanctuary,
    },

    {
      path: '/wellbeing-lessons',
      name: 'wellbeing-lessons',
      component: WellbeingLessons,
    },

    {
      path: '/class-calendar',
      name: 'class-calendar',
      component: ClassCalendar,
    },
  ],
})

export default router
