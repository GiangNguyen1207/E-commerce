import { select, takeLatest } from 'redux-saga/effects'

import {
  SEND_DATA,
} from '../../type'

function* saveStateWhenSendingData() {
  const state = yield select()
  yield localStorage.setItem('Products', JSON.stringify(state.product.products))
}

export default [
  takeLatest(SEND_DATA, saveStateWhenSendingData)
]