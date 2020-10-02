import { takeEvery, put, call, fork, select } from 'redux-saga/effects'
import axios from 'axios'

import API from '../services/api'
import { signinSuccess, updateProfileSuccess } from './actions'
import { showNotification } from 'components/redux/actions'
import { RootState } from 'redux/reducer'

import {
  USER_SIGN_UP, 
  USER_SIGN_IN,
  GOGGLE_SIGN_IN,
  USER_SIGN_OUT,
  UPDATE_USER_PROFILE,
  UserSignupAction,
  UserSigninAction,
  GoogleSigninAction,
  UpdateUserProfileAction
} from './types'

function* showError(error: any) {
  const message = error.response.data.message || error.message
  yield put(showNotification('error', message))
}

function* singup() {
  yield takeEvery(USER_SIGN_UP, function*(action: UserSignupAction) {
    const { firstName, lastName, username, email, password, history } = action.payload
    try {
      yield call(API.signup, firstName, lastName, username, email, password)
      history.push('/user/signIn')
    }
    catch (error) {
    yield showError(error)
    }
  })
}

function* signin() {
  yield takeEvery(USER_SIGN_IN, function*(action: UserSigninAction) {
    const { userInfo, password, history } = action.payload
    try {
      const { token, user } = yield call(API.signin, userInfo, password)
      if(user) {
        yield put(signinSuccess(token, user))
        history.push('/')
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

function* googleSignin() {
  yield takeEvery(GOGGLE_SIGN_IN, function*(action: GoogleSigninAction) {
    const { id_token, history } = action.payload
    try {
      const { token, user } = yield call(API.googleSignin, id_token)
      yield put(signinSuccess(token, user))
      history.push('/')
    } catch (error) {
      yield showError(error)
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

function* updateProfile() {
  yield takeEvery(UPDATE_USER_PROFILE, function*(action: UpdateUserProfileAction) {
    const { userId, update } = action.payload
    try {
      if(userId) {
        const user = yield call(API.updateUserProfile, userId, update)
        yield put(updateProfileSuccess(user))
        yield put(showNotification('success', 'User has been updated successfully'))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

export default [singup, signin, googleSignin, singout, updateProfile].map(fork)