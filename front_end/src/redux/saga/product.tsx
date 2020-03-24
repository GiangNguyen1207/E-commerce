import { select, takeLatest } from 'redux-saga/effects'

import {
  ADD_PRODUCT,
  SEND_DATA,
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  REMOVE_PRODUCT,
} from '../../type'

function* saveStateWhenAddingProduct() {
  const state = yield select()
  yield localStorage.setItem('cart', JSON.stringify(state.cart.productCart))
}

function* saveStateWhenRemovingProduct() {
  const state = yield select()
  yield localStorage.setItem('cart', JSON.stringify(state.cart.productCart))
}

function* saveStateWhenSendingData() {
  const state = yield select()
  yield localStorage.setItem('Products', JSON.stringify(state.product.products))
}

export default [
  takeLatest(ADD_PRODUCT, saveStateWhenAddingProduct),
  takeLatest(REMOVE_PRODUCT, saveStateWhenRemovingProduct),
  takeLatest(SEND_DATA, saveStateWhenSendingData)
]