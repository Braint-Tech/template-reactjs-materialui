export type ChangeModalComponent = {
  type: 'CHANGE_MODAL_COMPONENT',
  payload: JSX.Element
}

export type ChangeModalVisibility = {
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: boolean
}

type ModalActions = ChangeModalComponent | ChangeModalVisibility
export default ModalActions