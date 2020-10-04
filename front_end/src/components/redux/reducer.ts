import {
  SHOW_NOTIFICATION, 
  HIDE_NOTIFICATION,
  NotificationActions,
  NotificationState
} from './types'

const initialState: NotificationState = null

export function notification(state: NotificationState = initialState, action: NotificationActions) : NotificationState {
  switch(action.type) {
    case SHOW_NOTIFICATION:
      return action.payload

    case HIDE_NOTIFICATION: 
      return null

    default: 
      return state
  }
}