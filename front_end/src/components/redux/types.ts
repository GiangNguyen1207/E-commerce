export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export type NotificationType = 'success' | 'error' | 'info' | 'warning' | undefined  

export type Notification = {
  type: NotificationType,
  message: string
}

export type ShowNotificaiton = {
  type: typeof SHOW_NOTIFICATION
  payload: Notification
}

export type HideNotification = {
  type: typeof HIDE_NOTIFICATION
}

export type NotificationState = Notification | null

export type NotificationActions = 
  | ShowNotificaiton
  | HideNotification