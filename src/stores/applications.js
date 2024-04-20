import authAxios from '@/shared/axios/auth-axios'
import { defineStore } from 'pinia'

export default defineStore('applications', {
  state: () => ({
    currentApplication: null
  }),

  getters: {
    currentApplication: (state) => !!state.currentApplication
  },

  actions: {
    createApplication(payload) {
      const { name, description } = payload || {}

      const data = {}

      if (typeof name !== 'undefined') data.name = name
      if (typeof description !== 'undefined') data.description = description

      if (!Object.keys(data).length) return

      authAxios.post('application', data).then((response) => {
        this.currentApplication = response.data
      })
    }
  }
})
