import { History } from 'history'

export const USER_SIGN_UP = 'USER_SIGN_UP'
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS'
export const USER_SIGN_IN = 'USER_SIGN_IN'
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS'
export const GOGGLE_SIGN_IN = 'GOOGLE_SIGN_IN'
export const USER_SIGN_OUT = 'USER_SIGN_OUT'
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'

export type Cart = {
  productName: string
  productVariant: string
  productId: string
  quantity: number
  price: number
}

export type PasswordToken = {
  token: string
  timeOfCreated: number
  timeStamp: number
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  username: string
  email: string
  forgotPassword?: PasswordToken
  cart?: Cart[]
}

export type UserSignupAction = {
  type: typeof USER_SIGN_UP
  payload: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
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
    userInfo: string
    password: string
    history: History
  }
}

export type UserSigninSuccessAction = {
  type: typeof USER_SIGN_IN_SUCCESS
  payload: {
    token: string
    user: User
  }
}

export type GoogleSigninAction = {
  type: typeof GOGGLE_SIGN_IN
  payload: {
    id_token: string
    history: History
  }
}

export type UserSignoutAction = {
  type: typeof USER_SIGN_OUT
}

export type UpdateUserProfileAction = {
  type: typeof UPDATE_USER_PROFILE
  payload: {
    userId: string | undefined
    update: Partial<User>
  }
}

export type UpdateUserProfilSuccessAction = {
  type: typeof UPDATE_USER_PROFILE_SUCCESS
  payload: User
}

export type ResetPasswordAction = {
  type: typeof RESET_PASSWORD
  payload: {
    userId: string | undefined
    oldPassword: string
    newPassword: string
  }
}

export type ForGotPasswordAction = {
  type: typeof FORGOT_PASSWORD
  payload: string
}

export type AuthState = {
  token: string
  user?: User
}

export type AuthActions =
  | UserSignupAction
  | UerSignupSuccessAction
  | UserSigninAction
  | UserSigninSuccessAction
  | GoogleSigninAction
  | UserSignoutAction
  | UpdateUserProfileAction
  | UpdateUserProfilSuccessAction
  | ResetPasswordAction
  | ForGotPasswordAction
