import {
  USER_SIGN_IN_SUCCESS,
  AuthState,
  AuthActions
} from './types'

const initialState: AuthState = {
  token: '',
  user: undefined
}

export function auth(state: AuthState = initialState, action: AuthActions) : AuthState {
  switch(action.type) {
    case USER_SIGN_IN_SUCCESS: 
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }

    default: 
      return state
  }
}