import { combineReducers } from 'redux'

// import cartReducer from './cart'
import { product } from 'pages/productList/redux/reducer'
import { auth } from 'pages/auth/redux/reducer'

const rootReducer = combineReducers({
  product,
  auth
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer