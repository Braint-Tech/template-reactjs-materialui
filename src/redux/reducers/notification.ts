import produce from 'immer'
import { NotificationActions } from '../../types/actions/notification'
import { Store } from '../../types/store'

const initialState: Store['notification'] = {
  showing: false,
  text: '',
  timeout: 1500
}

const notificationReducer = (state: Store['notification'] = initialState, action: NotificationActions) =>
produce(state, draft => {
  if(action.type === 'CHANGE_NOTIFICATION_TEXT'){
    draft.text = action.payload
    draft.showing = true
  }else if(action.type === 'CHANGE_NOTIFICATION_TIMEOUT'){
    draft.timeout = action.payload
  }else if(action.type === 'CHANGE_NOTIFICATION_VISIBILITY'){
    draft.showing = action.payload
  }
})

export default notificationReducer