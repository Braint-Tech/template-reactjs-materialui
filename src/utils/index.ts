// import { Dispatch } from 'redux'
// import { Action } from '../types/actions'

// const getActionCreators =
// <type, payload, T>(dispatch: Dispatch<Action<type, payload>>, actionCreators: Ac) => {
//   const fns = Object.values(actionCreators)
//   const result = Object.keys(actionCreators).reduce((res, key, index) => {
//     return { ...res, [key]: fns[index](dispatch as any) }
//   }, {} as {[key in keyof T]: ReturnType<typeof actionCreators[key]>})
//   return result
// }

// export const combineActions =
// <type, payload, combinedActions>(dispatch: Dispatch<Action<type, payload>>, actionCreators: combinedActions) => {
//   // const combinedEntries = Object.entries(actionCreators)
//   // const finalActions = combinedEntries.reduce((res, [key, reducers]) => {
//   //   const reducersEntries = Object.entries(reducers)
//   //   const typeAnchor = (actionCreators as any)[key]
//   //   const reducersReduced = reducersEntries.reduce((res2, [key2, reducer]: [string, any]) => {
//   //     return { ...res2, [key2]: reducer(dispatch as any) }
//   //   }, {} as {[KEY in keyof typeof typeAnchor]: ReturnType<typeof typeAnchor[KEY]>})
//   //   return { ...res, [key]: reducersReduced }
//   // }, {} as {[KEY in keyof combinedActions]: any})
//   // return finalActions
//   return {}
// }

export const a = 'a'