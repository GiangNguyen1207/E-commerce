import { takeEvery, put, call, fork, select } from 'redux-saga/effects'

import API from '../services/api'
import { 
  getCartSuccess, 
  getFavoriteListSuccess,
  } from './actions'
import { showNotification } from 'components/redux/actions'
import { RootState } from 'redux/reducer'
import {
  ADD_PRODUCT_TO_CART,
  GET_CART,
  DELETE_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_PRODUCT_TO_FAVORITE_LIST,
  GET_FAVORITE_LIST,
  DELETE_PRODUCT_FAVORITE_LIST,
  AddProductToCartAction,
  DeleteProductAction,
  IncreaseQuantityAction,
  DecreaseQuantityAction,
  AddProductToFavoriteListAction,
  GetFavoriteListAction,
  DeleteProductInFavoriteListAction
} from './types'

function* showError(error: any) {
  const message = error.response.data.message || error.message
  yield put(showNotification('error', message))
}

function* addProductToCart() {
  yield takeEvery(ADD_PRODUCT_TO_CART, function*(action: AddProductToCartAction) {
    const { productName, productVariant, productId, price } = action.payload
    try {
      const state: RootState = yield select()
      if(state.auth.user) {
        const cart = yield call(API.addProductToCart, 
          state.auth.user?._id, 
          productName, 
          productVariant,  
          productId,
          price
        )
        yield put(showNotification('success', 'Product added successfully'))
        yield put(getCartSuccess(cart))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

function* getCart() {
  yield takeEvery(GET_CART, function*() {
    try {
      const state: RootState = yield select()
      if(state.auth.user) {
        const cart = yield call(API.getCart, state.auth.user?._id)
        yield put(getCartSuccess(cart))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

function* deleteProduct() {
  yield takeEvery(DELETE_PRODUCT, function*(action: DeleteProductAction) {
    try {
      const { userId, productId } = action.payload 
      if(userId) {
        const cart = yield call(API.deleteProduct, userId, productId)
        yield put(showNotification('success', 'Product deleted successfully'))
        yield put(getCartSuccess(cart))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

function* increaseQuantity() {
  yield takeEvery(INCREASE_QUANTITY, function*(action: IncreaseQuantityAction) {
    try {
      const { userId, productId } = action.payload
      if(userId) {
        const cart = yield call(API.increaseQuantity, userId, productId)
        yield put(getCartSuccess(cart))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

function* decreaseQuantity() {
  yield takeEvery(DECREASE_QUANTITY, function*(action: DecreaseQuantityAction) {
    try {
      const { userId, productId } = action.payload
      if(userId) {
        const cart = yield call(API.decreaseQuantity, userId, productId)
        yield put(getCartSuccess(cart))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

function* addToFavoriteList() {
  yield takeEvery(ADD_PRODUCT_TO_FAVORITE_LIST, function*(action: AddProductToFavoriteListAction) {
    try {
      const { userId, productId, productName, productVariant, image, price } = action.payload
      if(userId) {
        const favoriteList = yield call(API.addProductToFavoriteList, userId, productId, productName, productVariant, image, price)
        yield put(showNotification('success', 'Product added successfully'))
        yield put(getFavoriteListSuccess(favoriteList))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}


function* getFavoriteList() {
  yield takeEvery(GET_FAVORITE_LIST, function*(action: GetFavoriteListAction) {
    try {
      const userId = action.payload
      if(userId) {
        const favoriteList = yield call(API.getFavoriteList, userId)
        yield put(getFavoriteListSuccess(favoriteList))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

function* deleteProductFavoriteList() {
  yield takeEvery(DELETE_PRODUCT_FAVORITE_LIST, function*(action: DeleteProductInFavoriteListAction) {
    try {
      const { userId, productId } = action.payload
      if(userId) {
        const favoriteList = yield call(API.deleteProductInFavoriteList, userId, productId)
        yield put(showNotification('success', 'Product deleted successfully'))
        yield put(getFavoriteListSuccess(favoriteList))
      }
    } catch (error) {
      yield showError(error)
    }
  })
}

export default [
  addProductToCart, 
  getCart, 
  deleteProduct, 
  increaseQuantity, 
  decreaseQuantity,
  addToFavoriteList,
  getFavoriteList,
  deleteProductFavoriteList
].map(fork)