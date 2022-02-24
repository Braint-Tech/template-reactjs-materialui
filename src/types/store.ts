export type Store = {
  user: {
    id: number,
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