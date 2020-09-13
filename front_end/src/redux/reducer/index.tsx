import { combineReducers } from 'redux'

import { product } from 'pages/productList/redux/reducer'
import { auth } from 'pages/auth/redux/reducer'
import { cart } from 'pages/cart/redux/reducer'

const rootReducer = combineReducers({
  product,
  auth,
  cart
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer