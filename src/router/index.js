import { createRouter, createWebHistory } from 'vue-router'

import useAuthStore from '@/stores/auth'

import DashboardView from '../views/DashboardView.vue'
import ApplicationListView from '@/views/ApplicationListView.vue'
import ApplicationItemView from '../views/ApplicationItemView.vue'
import ApplicationNewView from '../views/ApplicationNewView.vue'
import OnboardingView from '../views/OnboardingView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      redirect: '/applications',
      children: [
        {
          path: 'applications',
          name: 'application-list',
          component: ApplicationListView
        },
        {
          path: 'applications/new',
          name: 'application-new',
          component: ApplicationNewView
        },
        {
          path: 'applications/:id',
          name: 'application-view',
          component: ApplicationItemView
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        },
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
