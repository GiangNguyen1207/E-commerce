import { takeEvery, put, call, fork } from 'redux-saga/effects'

import API from '../services/api'
import { signinSuccess } from './actions'

import {
  USER_SIGN_UP, 
  USER_SIGN_IN,
  UserSignupAction,
  UserSigninAction
} from './types'

function* singup() {
  yield takeEvery(USER_SIGN_UP, function*(action: UserSignupAction) {
    const { firstName, lastName, username, email, password, history } = action.payload
    try {
      yield call(API.signup, firstName, lastName, username, email, password)
      history.push('/user/signIn')
    }
    catch (error) {
      console.log(error)
    }
  })
}

function* signin() {
  yield takeEvery(USER_SIGN_IN, function*(action: UserSigninAction) {
    const { userInfo, password, history } = action.payload
    try {
      const { token, user } = yield call(API.signin, userInfo, password)
      yield put(signinSuccess(token, user))
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  })

}

export default [singup, signin].map(fork)