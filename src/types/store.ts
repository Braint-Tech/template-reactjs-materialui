export type Store = {
  user: {
    id: number,
  },
  modal: {
    open: boolean,
    component: JSX.Element
  }
}