import { Dispatch } from 'redux'
import { ChangeNotificationText, ChangeNotificationTimeout, ChangeNotificationVisibility } from '../../types/actions/notification'

const changeText =
(dispatch: Dispatch<ChangeNotificationText>) =>
(text: string | string[]) =>
dispatch({
  type: 'CHANGE_NOTIFICATION_TEXT',
  payload: text
})

const changeVisibility =
(dispatch: Dispatch<ChangeNotificationVisibility>) =>
(visibility: boolean) =>
dispatch({
  type: 'CHANGE_NOTIFICATION_VISIBILITY',
  payload: visibility
})

const changeTimeout =
(dispatch: Dispatch<ChangeNotificationTimeout>) =>
(timeoutMS: number) =>
dispatch({
  type: 'CHANGE_NOTIFICATION_TIMEOUT',
  payload: timeoutMS
})

const notificationActions = {
  changeText,
  changeVisibility,
  changeTimeout
}

export default notificationActions