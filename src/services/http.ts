import axios, { AxiosRequestConfig } from 'axios'

let updated = false
let headers: AxiosRequestConfig<any>['headers'] = {
  'Content-type': 'application/json'
}

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers
})

export const wasHeaderUpdated = () => updated

export const updateHTTPHeader = (nextHeader: AxiosRequestConfig<any>['headers']) => {
  updated = true
  headers = nextHeader
}

http.interceptors.request.use((req) => {
  const nextReq: AxiosRequestConfig<any> = {
    ...req,
    headers
  }
  return nextReq
})

export default http