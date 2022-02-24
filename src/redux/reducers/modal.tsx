import produce from 'immer'
import Alert from '../../components/Modal/Alert'
import ModalActions from '../../types/actions/modal'
import { Store } from '../../types/store'

const initialState: Store['modal'] = {
  open: false,
  component: <Alert title=''/>
}

const modalReducer = (state: Store['modal'] = initialState, action: ModalActions) =>
produce(state, draft => {
  if(action.type === 'CHANGE_MODAL_COMPONENT'){
    draft.open = true
    draft.component = action.payload
  }else if(action.type === 'CHANGE_MODAL_VISIBILITY'){
    draft.open = action.payload
  }
})

export default modalReducer