import { History } from 'history'

export const USER_SIGN_UP = 'USER_SIGN_UP'
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS'
export const USER_SIGN_IN = 'USER_SIGN_IN'
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS'

export type Cart = {
  productName: string;
  productVariant: string;
  productId: string;
  quantity: number;
}

export type PasswordToken = {
  token: string;
  timeOfCreated: number;
  timeStamp: number;
}

export type User = {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  forgotPassword?: PasswordToken,
  cart?: Cart[]
}

export type UserSignupAction = {
  type: typeof USER_SIGN_UP,
  payload: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    history: History
  }
}

export type UerSignupSuccessAction = {
  type: typeof USER_SIGN_UP_SUCCESS
  payload: User
}

export type UserSigninAction = {
  type: typeof USER_SIGN_IN
  payload: {
    userInfo: string,
    password: string,
    history: History
  }
}

export type UserSigninSuccessAction = {
  type: typeof USER_SIGN_IN_SUCCESS,
  payload: {
    token: string,
    user: User
  }
}

export type AuthState = {
  token: string,
  user?: User
}

export type AuthActions = 
  | UserSignupAction
  | UerSignupSuccessAction
  | UserSigninAction
  | UserSigninSuccessAction