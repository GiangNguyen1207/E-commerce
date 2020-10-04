import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  UPDATE_USER_PROFILE_SUCCESS,
  AuthState,
  AuthActions,
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

    case USER_SIGN_OUT: 
      delete state.token
      delete state.user
      return {
        ...state
      }
    
    case UPDATE_USER_PROFILE_SUCCESS: 
      return {
        ...state,
        user: action.payload
      }

    default: 
      return state
  }
}