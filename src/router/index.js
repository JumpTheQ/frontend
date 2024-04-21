import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/stores/auth'

import NewApplication from '../views/NewApplication.vue'
import DashboardView from '../views/DashboardView.vue'
import OnboardingView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: 'application/new',
          name: 'new-application',
          component: NewApplication
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },

    {
      path: '/onboarding',
      name: 'onboarding',
      component: OnboardingView
    }
  ]
})

router.beforeEach((to) => {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  } else {
    const { about, ambitions } = user || {}

    if (!about) return { name: 'onboarding', query: { section: 'about' } }
    if (!ambitions) return { name: 'onboarding', query: { section: 'ambitions' } }
  }
})

export default router
