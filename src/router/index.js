import { createRouter, createWebHistory } from 'vue-router'
import HomeSanctuary from '../views/HomeSanctuary.vue'
import ClassCalendar from '@/views/ClassCalendar.vue'
import WellbeingLessons from '@/views/WellbeingLessons.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
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

router.beforeEach((to) => {
  const auth = useAuthStore()
  const authenticated = auth.hasValidSession()
  if (to.meta.requiresAuth && !authenticated) return { name: 'login' }
  if ((to.name === 'login' || to.name === 'register') && authenticated) {
    return { name: 'dashboard' }
  }
})

export default router
