import { useMemo } from 'react'
import { combineActions } from '../redux/actionCreators'
import store from '../redux/store'
// import { combineActions } from '../utils'

export const useActions = () => useMemo(() => combineActions(store.dispatch), [])