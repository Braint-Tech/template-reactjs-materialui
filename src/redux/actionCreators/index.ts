import { Dispatch } from 'redux'
import { Action } from '../../types/actions'
import user from './user'

const actions = {
  user
}

export default actions

export const uncurryActionCreators =
<type, payload, T extends {[key: string]: (...args: any) => any}>(dispatch: Dispatch<Action<type, payload>>, actionCreators: T) => {
  const fns = Object.values(actionCreators)
  const result = Object.keys(actionCreators).reduce((res, key, index) => {
    return { ...res, [key]: fns[index](dispatch as any) }
  }, {} as {[key in keyof typeof actionCreators]: ReturnType<typeof actionCreators[key]>})
  return result
}

export const combineActions =
<type, payload>(dispatch: Dispatch<Action<type, payload>>) =>
Object.entries(actions).reduce((res, [key, reducers]) => {
  return { ...res, [key]: uncurryActionCreators(dispatch, reducers)}
}, {} as {[K in keyof typeof actions]: {
  [K2 in keyof typeof actions[K]]: typeof actions[K][K2] extends (...args: any) => infer R ? R : typeof actions[K][K2]
}})