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

    fetchUserData() {
      authAxios.get('/auth/me').then(({ data: responseData }) => {
        const { data } = responseData

        this.storeUser(data)
      })
    },

    updateUserData(payload) {
      const { about, ambitions, experiences, courses, languages, skills, userId } = payload || {}

      if (!userId) console.error('Missing userId in payload')

      const data = {}

      if (typeof about !== 'undefined') data.about = about
      if (typeof ambitions !== 'undefined') data.ambitions = ambitions
      if (typeof skills !== 'undefined') data.skills = skills

      authAxios.patch(`/user/${userId}`, data).then(({ data: responseData }) => {
        this.storeUser(responseData.data)
        console.log(payload)
        if (Array.isArray(experiences) && experiences.length) {
          this.addUserExperiences({ experiences })
        }

        if (Array.isArray(courses) && courses.length) {
          this.addUserCourses({ courses })
        }

        if (Array.isArray(languages) && languages.length) {
          this.addUserLanguages({ languages })
        }
      })
    },

    addUserCourses(payload) {
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
        authAxios.post('/course', data).then(({ data: responseData }) => {
          this.experiences.push(responseData.data)
        })
      }
    },

    addUserExperiences(payload) {
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
        authAxios.post('/experience', data).then(({ data: responseData }) => {
          this.courses.push(responseData.data)
        })
      }
    },

    addUserLanguages(payload) {
      const { languages } = payload || {}

      for (const language of languages) {
        const { name, level } = language || {}

        const data = {
          name,
          level
        }
        console.log(data)
        authAxios.post('/language', data).then(({ data: responseData }) => {
          this.languages.push(responseData.data)
        })
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
