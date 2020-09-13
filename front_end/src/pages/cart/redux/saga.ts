import { takeEvery, put, call, fork, select } from 'redux-saga/effects'

import API from '../services/api'
import { 
  addProductToCartSuccess, 
  getCartSuccess, 
  deleteProductSuccess,
  increaseQuantitySuccess,
  decreaseQuantitySuccess
  } from './actions'
import { RootState } from 'redux/reducer'
import {
  ADD_PRODUCT_TO_CART,
  GET_CART,
  DELETE_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  AddProductToCartAction,
  DeleteProductAction,
  IncreaseQuantityAction,
  DecreaseQuantityAction
} from './types'


function* addProductToCart() {
  yield takeEvery(ADD_PRODUCT_TO_CART, function*(action: AddProductToCartAction) {
    const { productName, productVariant, productId} = action.payload
    try {
      const state: RootState = yield select()
      if(state.auth.user) {
        const cart = yield call(API.addProductToCart, 
          state.auth.user?._id, 
          productName, 
          productVariant,  
          productId
        )
        yield put(addProductToCartSuccess(cart))
      }
    } catch (error) {
      console.log(error)
    }
  })
}

function* getCart() {
  yield takeEvery(GET_CART, function*() {
    try {
      const state: RootState = yield select()
      if(state.auth.user) {
        console.log('in')
        const cart = yield call(API.getCart, state.auth.user?._id)
        yield put(getCartSuccess(cart))
      }
    } catch (error) {
      console.log(error)
    }
  })
}

function* deleteProduct() {
  yield takeEvery(DELETE_PRODUCT, function*(action: DeleteProductAction) {
    try {
      const { userId, productId } = action.payload 
      if(userId) {
        const cart = yield call(API.deleteProduct, userId, productId)
        yield put(deleteProductSuccess(cart))
      }
    } catch (error) {
      console.log(error)
    }
  })
}

function* increaseQuantity() {
  yield takeEvery(INCREASE_QUANTITY, function*(action: IncreaseQuantityAction) {
    try {
      const { userId, productId } = action.payload
      if(userId) {
        const cart = yield call(API.increaseQuantity, userId, productId)
        yield put(increaseQuantitySuccess(cart))
      }
    } catch (error) {
      console.log(error)
    }
  })
}

function* decreaseQuantity() {
  yield takeEvery(DECREASE_QUANTITY, function*(action: DecreaseQuantityAction) {
    try {
      const { userId, productId } = action.payload
      if(userId) {
        const cart = yield call(API.decreaseQuantity, userId, productId)
        yield put(decreaseQuantitySuccess(cart))
      }
    } catch (error) {
      console.log(error)
    }
  })
}


export default [
  addProductToCart, 
  getCart, 
  deleteProduct, 
  increaseQuantity, 
  decreaseQuantity
].map(fork)