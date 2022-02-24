export type ChangeNotificationText = {
  type: 'CHANGE_NOTIFICATION_TEXT',
  payload: string | string[]
}

export type ChangeNotificationVisibility = {
  type: 'CHANGE_NOTIFICATION_VISIBILITY',
  payload: boolean
}

export type ChangeNotificationTimeout = {
  type: 'CHANGE_NOTIFICATION_TIMEOUT',
  payload: number
}

export type NotificationActions = ChangeNotificationText | ChangeNotificationVisibility | ChangeNotificationTimeout