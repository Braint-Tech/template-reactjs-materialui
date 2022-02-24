import { combineReducers } from 'redux'
import user from './user'
import modal from './modal'
import notification from './notification'

export const reducers = combineReducers({
  user,
  modal,
  notification
})