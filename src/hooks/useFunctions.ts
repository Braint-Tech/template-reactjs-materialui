import { useCallback } from 'react'
import { useStore } from './useStore'

export const useFunctions = () => {
  const { user } = useStore()
  const isLoggedIn = useCallback(() => !!user.info, [ user ])
  const isAdmin = useCallback(() => !!user.info && user.info.role === 1, [ user ])

  return {
    isLoggedIn,
    isAdmin
  }
}