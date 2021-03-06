import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga'
import rootReducer, { RootState } from './reducer';

const initState: RootState = {
  notification: null,
  product: {
    products: [],
    searchedProducts: [],
    singleProduct: undefined
  }, 
  auth: {
    token: '',
    user: undefined
  },
  cart: {
    cart: undefined,
    favoriteList: undefined
  }
};

export default function makeStore() {
  let initialState;
  const loadedState = localStorage.getItem('state')

  if(loadedState !== null) {
    initialState = JSON.parse(loadedState)
  } else initialState = initState

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}