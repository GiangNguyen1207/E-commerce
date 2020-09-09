import {
  FETCH_ALL_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_SUCCESS,
  FETCH_ONE_PRODUCT_SUCCESS,
  ProductActions,
  ProductState,
} from './types'

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  singleProduct: undefined
}

export function product(state: ProductState = initialState, action: ProductActions) : ProductState {
  switch(action.type) {
    case FETCH_ALL_PRODUCTS_SUCCESS: 
      return {
        ...state,
        products: action.payload
      }

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        filteredProducts: action.payload
      }

    case FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProduct: action.payload
      }

    default:
      return state
  }
}