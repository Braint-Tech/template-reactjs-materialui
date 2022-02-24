import { Dispatch } from 'redux'
import { ChangeModalComponent, ChangeModalVisibility } from '../../types/actions/modal'

const show =
(dispatch: Dispatch<ChangeModalComponent>) =>
(component: JSX.Element) =>
dispatch({
  type: 'CHANGE_MODAL_COMPONENT',
  payload: component
})

const hide =
(dispatch: Dispatch<ChangeModalVisibility>) =>
() =>
dispatch({
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: false
})

const modalActions = {
  show,
  hide
}

export default modalActions