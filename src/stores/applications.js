import authAxios from '@/shared/axios/auth-axios'
import { defineStore } from 'pinia'

export default defineStore('applications', {
  state: () => ({
    records: {},
    ids: [],
    loading: false,
    count: 0
  }),

  getters: {
    applicationById: (state) => (id) => state.records[id],

    rows: (state) => state.ids.map((id) => state.records[id]),

    renderedCoverLetterByApplicationId: (state) => (id) => state.records[id]?.coverLetter?.rendered,

    renderedResumeByApplicationId: (state) => (id) => state.records[id]?.resume?.rendered
  },

  actions: {
    async createApplication(payload) {
      const { data: response } = await authAxios.post('application', payload )
      const { data } = response || {}

      this.records[data.id] = data
      this.ids.push(data.id)

      await this.fetchCoverLetter(data.id)
      await this.fetchResume(data.id)
      return data
    },

    async fetchApplications() {
      const { data: response } = await authAxios.get(`application/`)

      this.ids = response.data.map((record) => {
        this.records[record.id] = record
        return record.id
      })
    },

    async fetchApplication(id) {
      const { data: response } = await authAxios.get(`application/${id}`)
      const { data } = response || {}
      this.records[id] = data
      if (!this.ids.includes(id)) this.ids.push(id)

      await this.fetchCoverLetter(id)
      await this.fetchResume(id)
    },

    async fetchCoverLetter(id) {
      const { data: response } = await authAxios.get(`application/${id}/coverLetter`)
      const { data } = response || {}

      this.records[id].coverLetter = data

      return data
    },

    async fetchRenderedCoverLetter(payload) {
      const { applicationId, coverLetterId } = payload || {}
      const { data: response } = await authAxios
        .get(`application/${applicationId}/coverLetter/${coverLetterId}`)

      this.records[applicationId].coverLetter.rendered = response
    },

    async fetchRenderedResume(payload) {
      const { applicationId, resumeId } = payload || {}

      const { data: response } = await authAxios.get(`application/${applicationId}/resume/${resumeId}`)
      this.records[applicationId].resume.rendered = response
    },

    async fetchResume(id) {
      const { data: response } = await authAxios.get(`application/${id}/resume`)
      const { data } = response || {}

      this.records[id].resume = data

      return data
    }
  }
})
