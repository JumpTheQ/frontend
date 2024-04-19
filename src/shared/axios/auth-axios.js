import Axios from 'axios'
import config from '@/config'

const authAxios = Axios.create({
  baseURL: config.backendUrl,
  withCredentials: true,
  withXSRFToken: true
})

export default authAxios