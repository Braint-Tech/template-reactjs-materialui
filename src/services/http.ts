import axios, { AxiosRequestConfig } from 'axios'

let updated = false

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

export const wasHeaderUpdated = () => updated

export const updateHTTPHeader = (nextHeader: AxiosRequestConfig<any>['headers']) => {
  updated = true
  http.interceptors.request.use((req) => {
    const nextReq: AxiosRequestConfig<any> = {
      ...req,
      headers: nextHeader
    }
    return nextReq
  })
}

export default http