import { Dispatch } from 'redux'
import { LoginUser, LogoutUser } from '../../types/actions/user'
import { User } from '../../types/user'

const login =
(dispatch: Dispatch<LoginUser>) =>
(user: User) =>
dispatch({
  type: 'LOGIN_USER',
  payload: user
})

const logout =
(dispatch: Dispatch<LogoutUser>) =>
() =>
dispatch({
  type: 'LOGOUT_USER',
  payload: null
})

const userActions = {
  login,
  logout
}

export default userActions