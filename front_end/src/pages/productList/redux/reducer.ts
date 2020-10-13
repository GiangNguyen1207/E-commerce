import {
  FETCH_ALL_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_SUCCESS,
  FETCH_ONE_PRODUCT_SUCCESS,
  ProductActions,
  ProductState,
} from './types'

const initialState: ProductState = {
  allProducts: [],
  searchedProducts: [],
  singleProduct: undefined,
}

export function product(
  state: ProductState = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
      }

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        searchedProducts: action.payload,
      }

    case FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProduct: action.payload,
      }

    default:
      return state
  }
}
