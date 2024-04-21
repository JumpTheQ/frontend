import authAxios from '@/shared/axios/auth-axios'
import { defineStore } from 'pinia'

export default defineStore('applications', {
  state: () => ({
    records: {},
    ids: [],
    loading: false,
    count: 0
  }),

  getters: {},

  actions: {
    createApplication(payload) {
      const { name, description } = payload || {}
      const data = {}

      if (typeof name !== 'undefined') data.name = name
      if (typeof description !== 'undefined') data.description = description

      if (!Object.keys(data).length) return

      authAxios.post('application', data).then(({ data: responseData }) => {
        const { data } = responseData || {}

        this.records[data.id] = data
        this.ids.push(data.id)
      })
    }
  }
})
