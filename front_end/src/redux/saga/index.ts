import { all } from 'redux-saga/effects';

import stateSagas from './state'
import productSaga from 'pages/productList/redux/saga'
import authSaga from 'pages/auth/redux/saga'

export default function* rootSaga() {
  yield all([
    ...stateSagas,
    ...productSaga,
    ...authSaga
  ]);
}