import { createRouter, createWebHistory } from 'vue-router'
import HomeSanctuary from '../views/HomeSanctuary.vue'
import ClassCalendar from '@/views/ClassCalendar.vue'
import WellbeingLessons from '@/views/WellbeingLessons.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
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
