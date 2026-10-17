import { createRouter, createWebHistory } from 'vue-router'
import HomeSanctuary from '../views/HomeSanctuary.vue'
import ClassCalendar from '@/views/ClassCalendar.vue'
import WellbeingLessons from '@/views/WellbeingLessons.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import RegisterView from '@/views/RegisterView.vue'
import ReservationView from '@/views/ReservationView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import AdminReservationsView from '@/views/AdminReservationsView.vue'
import AdminSessionFormView from '@/views/AdminSessionFormView.vue'

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
      path: '/admin',
      name: 'admin',
      component: AdminDashboardView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/reservations',
      name: 'admin-reservations',
      component: AdminReservationsView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/sessions/new',
      name: 'admin-session-new',
      component: AdminSessionFormView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/sessions/:id/edit',
      name: 'admin-session-edit',
      component: AdminSessionFormView,
      meta: { requiresAuth: true, requiresAdmin: true },
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

    {
      path: '/class-calendar/:id/reserve',
      name: 'reservation',
      component: ReservationView,
      // Only members book sessions; admins manage them.
      meta: { requiresAuth: true, forbidsAdmin: true },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const authenticated = auth.hasValidSession()
  if (to.meta.requiresAuth && !authenticated) return { name: 'login' }
  if (to.meta.requiresAdmin && !auth.isAdmin) return { name: 'dashboard' }
  if (to.meta.forbidsAdmin && auth.isAdmin) return { name: 'admin' }
  if ((to.name === 'login' || to.name === 'register') && authenticated) {
    return { name: auth.homeRoute }
  }
})

export default router
