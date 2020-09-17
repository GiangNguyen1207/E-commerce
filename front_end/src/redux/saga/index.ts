import { all } from 'redux-saga/effects';

import stateSagas from './state'
import productSaga from 'pages/productList/redux/saga'
import authSagas from 'pages/auth/redux/saga'
import cartSagas from 'pages/cart/redux/saga'

export default function* rootSaga() {
  yield all([
    ...stateSagas,
    ...productSaga,
    ...authSagas,
    ...cartSagas
  ]);
}