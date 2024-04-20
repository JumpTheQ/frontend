import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import CreateApplication from '../views/CreateApplication.vue'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-application',
      name: 'create-application',
      component: CreateApplication,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const nextRouteRequiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const { isAuthenticated } = useAuthStore()

  if (nextRouteRequiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
