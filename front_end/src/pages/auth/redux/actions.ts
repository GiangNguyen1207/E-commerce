import { History } from 'history'

import {
  USER_SIGN_UP,
  USER_SIGN_IN,
  USER_SIGN_IN_SUCCESS,
  GOGGLE_SIGN_IN,
  USER_SIGN_OUT,
  AuthActions,
  User,
} from './types'

export function signup(
  firstName: string, 
  lastName: string, 
  username: string,
  email: string,
  password: string,
  history: History
  ) : AuthActions {
  return {
    type: USER_SIGN_UP,
    payload: {
      firstName,
      lastName,
      username,
      email,
      password,
      history
    }
  }
}

export function signin(userInfo: string, password: string, history: History) : AuthActions{
  return {
    type: USER_SIGN_IN,
    payload: {
      userInfo,
      password,
      history
    }
  }
}

export function signinSuccess(token: string, user: User) : AuthActions{
  return {
    type: USER_SIGN_IN_SUCCESS,
    payload: {
      token,
      user
    }
  }
}

export function googleSignin(id_token: string, history: History) : AuthActions{
  return {
    type: GOGGLE_SIGN_IN,
    payload: {
      id_token,
      history
    }
  }
}

export function signout() : AuthActions {
  return {
    type: USER_SIGN_OUT,
  }
}