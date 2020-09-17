import { select, takeLatest } from 'redux-saga/effects'

function* addStateToLocalStorage() {
  const state = yield select()
  yield localStorage.setItem('state', JSON.stringify(state))
}

export default [takeLatest('*', addStateToLocalStorage)]