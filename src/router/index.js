import { createRouter, createWebHistory } from 'vue-router'

import useAuthStore from '@/stores/auth'

import ApplicationResultsView from '../views/ApplicationResultsView.vue'
import NewApplication from '../views/NewApplication.vue'
import DashboardView from '../views/DashboardView.vue'
import OnboardingView from '../views/OnboardingView.vue'
import LoginView from '../views/LoginView.vue'

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
        },
        {
          path: 'application/:id',
          name: 'application',
          component: ApplicationResultsView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
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
  } else if (isAuthenticated) {
    const { about, ambitions } = user || {}

    if (!about && to.name !== 'onboarding' && !to.query.section !== 'about')
      return { name: 'onboarding', query: { section: 'about' } }
    if (!ambitions && to.name !== 'onboarding' && !to.query.section !== 'ambitions')
      return { name: 'onboarding', query: { section: 'ambitions' } }
  }
})

export default router
