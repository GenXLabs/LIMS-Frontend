import axios from 'axios'

/* Local Backend */
const BaseURL = 'http://13.251.138.245:8082/api/v1/lims'

export const api = axios.create({
  baseURL: BaseURL
})
