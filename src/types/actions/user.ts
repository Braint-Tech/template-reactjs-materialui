import { Store } from '../store'

export type LoginUser = {
  type: 'LOGIN_USER',
  payload: Store['user']
}

export type LogoutUser = {
  type: 'LOGOUT_USER',
  payload: null
}

export type UserActions = LoginUser | LogoutUser