import { User } from './user'

export type Store = {
  user: {
    info?: User
  },
  modal: {
    open: boolean,
    component: JSX.Element
  },
  notification: {
    text: string | string[],
    showing: boolean,
    timeout: number
  }
}