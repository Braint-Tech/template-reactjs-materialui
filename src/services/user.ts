import { AxiosResponse } from 'axios'
import http from './http'

export type CreateUserEntries = {
  email: string,
  password: string
}
export const createUser =
(user: CreateUserEntries) =>
http.post('/user', user)



export type AuthUserEntries = {
  email: string,
  password: string
}
export const authUser =
(entries: AuthUserEntries) =>
http.post<any, AxiosResponse<AuthUserResponse>>('/user/auth', entries)
export type AuthUserResponse = {
  token: string
}
