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
    createApplication(payload) {
      const { name, description } = payload || {}
      const data = {}

      if (typeof name !== 'undefined') data.name = name
      if (typeof description !== 'undefined') data.description = description

      if (!Object.keys(data).length) return

      return authAxios.post('application', data).then(({ data: responseData }) => {
        const { data } = responseData || {}

        this.records[data.id] = data
        this.ids.push(data.id)

        return data.id
      })
    },

    async fetchApplications() {
      const { data: response } = await authAxios.get(`application/`)

      this.ids = response.data.map((record) => {
        this.records[record.id] = record
        return record.id
      })

      this.ids.forEach((id) => {
        this.fetchCoverLetter(id)
        this.fetchResume(id)
      })
    },

    fetchApplication(id) {
      authAxios.get(`application/${id}`).then(({ data: responseData }) => {
        const { data } = responseData || {}

        this.records[id] = data
        if (!this.ids.includes(id)) this.ids.push(id)

        this.fetchCoverLetter(id)
        this.fetchResume(id)
      })
    },

    fetchCoverLetter(id) {
      authAxios.get(`application/${id}/coverLetter`).then(({ data: responseData }) => {
        const { data } = responseData || {}

        this.records[id].coverLetter = data
      })
    },

    fetchRenderedCoverLetter(payload) {
      const { applicationId, coverLetterId } = payload || {}
      authAxios
        .get(`application/${applicationId}/coverLetter/${coverLetterId}`)
        .then(({ data }) => {
          this.records[applicationId].coverLetter.rendered = data
        })
    },

    fetchRenderedResume(payload) {
      const { applicationId, resumeId } = payload || {}

      authAxios.get(`application/${applicationId}/resume/${resumeId}`).then(({ data }) => {
        this.records[applicationId].resume.rendered = data
      })
    },

    fetchResume(id) {
      authAxios.get(`application/${id}/resume`).then(({ data: responseData }) => {
        const { data } = responseData || {}

        this.records[id].resume = data
      })
    }
  }
})
