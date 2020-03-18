import { all } from 'redux-saga/effects';

import ProductSagas from './product'


export default function* rootSaga() {
  yield all([
    ...ProductSagas,
  ]);
}