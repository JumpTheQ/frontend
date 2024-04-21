import authAxios from '@/shared/axios/auth-axios'
import { defineStore } from 'pinia'

export default defineStore('auth', {
  state: () => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'))

    // /user/userId --> update user data

    return {
      user: localStorageUser ?? null
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    storeUser(payload) {
      this.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },

    fetchUserData() {
      authAxios.get('/auth/me').then(({ data: responseData }) => {
        const { data } = responseData

        this.storeUser(data)
      })
    },

    updateUserData(payload) {
      const { about, ambitions, userId } = payload || {}

      if (!userId) console.error('Missing userId in payload')

      const data = {}

      if (typeof about !== 'undefined') data.about = about
      if (typeof ambitions !== 'undefined') data.ambitions = ambitions

      if (!Object.keys(data).length) return

      authAxios.patch(`/user/${userId}`, data).then(({ data: responseData }) => {
        this.storeUser(responseData.data)
      })
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
