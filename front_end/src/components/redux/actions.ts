import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  NotificationType,
  NotificationActions
} from './types'

export function showNotification(type: NotificationType, message: string) : NotificationActions {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      type,
      message
    }
  }
}

export function hideNotification() : NotificationActions {
  return {
    type: HIDE_NOTIFICATION
  }
}