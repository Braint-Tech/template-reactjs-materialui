import { User } from '../user'

export type LoginUser = {
  type: 'LOGIN_USER',
  payload: User
}

export type LogoutUser = {
  type: 'LOGOUT_USER',
  payload: null
}

type UserActions = LoginUser | LogoutUser
export default UserActions