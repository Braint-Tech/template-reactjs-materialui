import { combineReducers } from 'redux'
import user from './user'
import modal from './modal'

export const reducers = combineReducers({
  user,
  modal
})