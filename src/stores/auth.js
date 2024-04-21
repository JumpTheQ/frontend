import authAxios from '@/shared/axios/auth-axios'
import { defineStore } from 'pinia'
import { format } from 'date-fns'

export default defineStore('auth', {
  state: () => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'))

    return {
      user: localStorageUser ?? null,

      courses: [],

      experiences: [],

      languages: []
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

    async fetchUserData() {
      const { data: response } = await authAxios.get('/auth/me')
      const { data } = response || {}

      this.storeUser(data)
    },

    async updateUserData(payload) {
      const { about, ambitions, experiences, courses, languages, skills, userId } = payload || {}

      if (!userId) console.error('Missing userId in payload')

      const data = {}

      if (typeof about !== 'undefined') data.about = about
      if (typeof ambitions !== 'undefined') data.ambitions = ambitions
      if (typeof skills !== 'undefined') data.skills = skills

      const { data: response } = await authAxios.patch(`/user/${userId}`, data)

      this.storeUser(response.data)

      if (Array.isArray(experiences) && experiences.length) {
        await this.addUserExperiences({ experiences })
      }

      if (Array.isArray(courses) && courses.length) {
        await this.addUserCourses({ courses })
      }

      if (Array.isArray(languages) && languages.length) {
        await this.addUserLanguages({ languages })
      }
    },

    async addUserCourses(payload) {
      const { courses } = payload || {}

      for (const course of courses) {
        const { description, endDate, institution, name, startDate } = course || {}

        const data = {
          description,
          end_date: format(endDate, 'yyyy-MM-dd'),
          institution,
          name,
          start_date: format(startDate, 'yyyy-MM-dd')
        }
        console.log(data)
        const { data: response } = authAxios.post('/course', data)
        this.experiences.push(response.data)
      }
    },

    async addUserExperiences(payload) {
      const { experiences } = payload || {}

      for (const experience of experiences) {
        const { companyName, description, endDate, startDate, title } = experience || {}

        const data = {
          company_name: companyName,
          description,
          end_date: format(endDate, 'yyyy-MM-dd'),
          start_date: format(startDate, 'yyyy-MM-dd'),
          title
        }
        console.log(data)
        const { data: response } = await authAxios.post('/experience', data)
        this.courses.push(response.data)
      }
    },

    async addUserLanguages(payload) {
      const { languages } = payload || {}

      for (const language of languages) {
        const { name, level } = language || {}

        const data = {
          name,
          level
        }
        console.log(data)
        const { data: response } = authAxios.post('/language', data)
        this.languages.push(response.data)
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
