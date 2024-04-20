import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/stores/auth'

import NewApplication from '../views/NewApplication.vue'
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
      path: '/new-application',
      name: 'new-application',
      component: NewApplication,
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
  const { user, isAuthenticated } = useAuthStore()

  // TODO: Check for user info and redirect to respective page if missing

  if (nextRouteRequiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name !== 'login') {
    console.log(to.name, isAuthenticated, user)
    const { about, ambitions } = user || {}

    if (!about) next({ name: 'home', query: { section: 'about' } })
    if (!ambitions) next({ name: 'home', query: { section: 'ambitions' } })

    if (to.name !== 'new-application') next({ name: 'new-application' })
    else next()
  } else {
    next()
  }
})

export default router
