import { defineStore } from 'pinia'
import authAxios from '@/shared/axios/auth-axios.js'

export default defineStore('prompt', {
  state: () => ({
    records: {},
    ids: [],
    count: 0,
    activeSection: null
  }),
  getters: {
    recordsArray: (state) => Object.values(state.records),
    applicationPrompts: (state) => (application_id) => Object.values(state.records)
      .filter((record) => record.application_id !== application_id),
  },
  actions: {
    async fetchPrompts(application_id) {
      const { data: response } = await authAxios.get(`application/${application_id}/prompt`)
      this.ids = response.data.map((record) => {
        this.records[record.id] = record
        return record.id
      })
    },

    async createPrompt(application_id, prompt) {
      const { data: response } = await authAxios.post(`application/${application_id}/prompt`, prompt)
      this.records[prompt.id] = response.data
      this.ids.push(response.data.id)
    },

    setActiveSection(activeSection) {
      this.activeSection = activeSection
    }
  }
})
