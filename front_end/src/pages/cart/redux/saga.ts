import { takeEvery, put, call, fork, select } from 'redux-saga/effects'

import API from '../services/api'
import { addProductToCartSuccess } from './actions'
import { RootState } from 'redux/reducer'
import {
  ADD_PRODUCT_TO_CART,
  AddProductToCartAction
} from './types'


function* addProductToCart() {
  yield takeEvery(ADD_PRODUCT_TO_CART, function*(action: AddProductToCartAction) {
    const { productName, productVariant, productId} = action.payload
    try {
      const state : RootState = yield select()
      const userId = state.auth.user?._id
      if (userId) {
        const cart = yield call(API.addProductToCart, userId, productName, productVariant,  productId)
        yield put(addProductToCartSuccess(cart))
      }
    } catch (error) {
      console.log(error)
    }
  })
}

export default [addProductToCart].map(fork)