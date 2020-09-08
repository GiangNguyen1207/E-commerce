import { combineReducers } from 'redux'

// import cartReducer from './cart'
import { product } from 'pages/searchProducts/redux/reducer'

const rootReducer = combineReducers({
  product
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer