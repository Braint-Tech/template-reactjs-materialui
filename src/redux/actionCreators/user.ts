import { Dispatch } from 'redux'
import { LoginUser, LogoutUser } from '../../types/actions/user'
import { Store } from '../../types/store'

const login =
(dispatch: Dispatch<LoginUser>) =>
(user: Store['user']) =>
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