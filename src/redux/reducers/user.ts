import produce from 'immer'
import { UserActions } from '../../types/actions/user'
import { Store } from '../../types/store'

const initialState: Store['user'] = {
  id: -1
}

const userReducer = (state: Store['user'] = initialState, action: UserActions) =>
produce(state, draft => {
  if(action.type === 'LOGIN_USER'){
    draft = action.payload
  }else if(action.type === 'LOGOUT_USER'){
    draft.id = -1
  }
})

export default userReducer