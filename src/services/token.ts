const BUCKET_NAME = '<sigla>-token'

export const saveToken = (token: string) => localStorage.setItem(BUCKET_NAME, token)

export const getToken = (): string | null => localStorage.getItem(BUCKET_NAME)

export const hasToken = !!getToken()

export const removeToken = () => localStorage.removeItem(BUCKET_NAME)