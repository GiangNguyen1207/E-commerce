import { takeEvery, put, call, fork } from 'redux-saga/effects'

import API from '../services/api'
import { fetchAllProductsSuccess, findProductsSuccess, fetchOneProductSucess } from './actions'

import {
  FETCH_ALL_PRODUCTS,
  FIND_PRODUCTS,
  FETCH_ONE_PRODUCT,
  FindProductsAction,
  FetchOneProductAction
} from './types'


function* fetchAllProducts() {
  yield takeEvery(FETCH_ALL_PRODUCTS, function*() {
    try {
      const allProducts = yield call(API.fetchAllProducts)
      yield put(fetchAllProductsSuccess(allProducts))
    } catch (error) {
      console.log(error)
    }
  })
}

function* findProducts() {
  yield takeEvery(FIND_PRODUCTS, function*(action: FindProductsAction) {
    try {
      const query = action.payload
      const filteredProducts = yield call(API.findProducts, query)
      yield put(findProductsSuccess(filteredProducts))
    } catch (error) {
      console.log(error)
    }
  })
}

function* fetchOneProduct() {
  yield takeEvery(FETCH_ONE_PRODUCT, function*(action: FetchOneProductAction) {
    try {
      const productId = action.payload
      const singleProduct = yield call(API.fetchOneProduct, productId)
      yield put(fetchOneProductSucess(singleProduct))
    } catch (error) {
      console.log(error)
    }
  })
}

export default [fetchAllProducts, findProducts, fetchOneProduct].map(fork)