import { all } from 'redux-saga/effects';

import ProductSagas from 'pages/searchProducts/redux/saga'

export default function* rootSaga() {
  yield all([
    ...ProductSagas,
  ]);
}