import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  // const isAuthenticated = computed(() => !!user.value)
  const isAuthenticated = computed(() => true)

  const storeUser = (payload) => {
    const { user } = payload

    user.value = user
  }

  return {
    user,
    isAuthenticated,
    storeUser
  }
})
