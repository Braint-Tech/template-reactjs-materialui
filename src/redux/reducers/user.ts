import produce from 'immer'
import UserActions from '../../types/actions/user'
import { Store } from '../../types/store'

// const initialState: Store['user'] = 'none'

const userReducer = (state: Store['user'] = {}, action: UserActions) =>
produce(state, draft => {
  if(action.type === 'LOGIN_USER'){
    draft.info = action.payload
  }else if(action.type === 'LOGOUT_USER'){
    draft.info = undefined
  }
})

export default userReducer