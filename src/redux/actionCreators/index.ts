import { Dispatch } from 'redux'
import { Action } from '../../types/actions'
import user from './user'
import modal from './modal'
import { uncurryActionCreators } from '../../utils'

const actions = {
  user,
  modal
}

export default actions


export const combineActions =
<type, payload>(dispatch: Dispatch<Action<type, payload>>) =>
Object.entries(actions).reduce((res, [key, reducers]) => {
  return { ...res, [key]: uncurryActionCreators(dispatch, reducers)}
}, {} as {[K in keyof typeof actions]: {
  [K2 in keyof typeof actions[K]]: typeof actions[K][K2] extends (...args: any) => infer R ? R : typeof actions[K][K2]
}})