import { takeEvery, put, call, fork, select } from 'redux-saga/effects'
import axios from 'axios'

import API from '../services/api'
import { signinSuccess } from './actions'
import { RootState } from 'redux/reducer'

import {
  USER_SIGN_UP, 
  USER_SIGN_IN,
  GOGGLE_SIGN_IN,
  USER_SIGN_OUT,
  UserSignupAction,
  UserSigninAction,
  GoogleSigninAction,
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
      console.log('token', token)
      yield put(signinSuccess(token, user))
      // axios.defaults.headers.common[
      //   'Authorization'
      // ] = `Bearer ${token}`
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  })
}

function* googleSignin() {
  yield takeEvery(GOGGLE_SIGN_IN, function*(action: GoogleSigninAction) {
    const { id_token, history } = action.payload
    try {
      const { token, user } = yield call(API.googleSignin, id_token)
      yield put(signinSuccess(token, user))
      // axios.defaults.headers.common[
      //   'Authorization'
      // ] = `Bearer ${token}`
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  })
}

function* singout() {
  yield takeEvery(USER_SIGN_OUT, function*() {
    yield localStorage.clear()
      const state: RootState = yield select()
      delete state.cart
    delete axios.defaults.headers.common['Authorization']
  })
}

export default [singup, signin, googleSignin, singout].map(fork)