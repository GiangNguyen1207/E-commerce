import {
  ADD_PRODUCT_TO_CART_SUCCESS,
  GET_CART_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  INCREASE_QUANTITY_SUCCESS,
  DECREASE_QUANTITY_SUCCESS,
  ADD_PRODUCT_TO_FAVORITE_LIST_SUCCESS,
  GET_FAVORITE_LIST_SUCCESS,
  CartActions,
  CartState,
} from './types'

const initialState: CartState = {
  cart: undefined,
  favoriteList: undefined
}

export function cart(state: CartState = initialState, action: CartActions) : CartState {
  switch(action.type) {
    case ADD_PRODUCT_TO_CART_SUCCESS: 
      return {
        ...state,
        cart: action.payload
      }

    case GET_CART_SUCCESS: 
      return {
        ...state,
        cart: action.payload
      }
    
    case DELETE_PRODUCT_SUCCESS: 
      return {
        ...state,
        cart: action.payload
      }

    case INCREASE_QUANTITY_SUCCESS: 
      return {
        ...state,
        cart: action.payload
      }
    
    case DECREASE_QUANTITY_SUCCESS: 
      return {
        ...state,
        cart: action.payload
    }

    case ADD_PRODUCT_TO_FAVORITE_LIST_SUCCESS:
      return {
        ...state,
        favoriteList: action.payload
      }

    case GET_FAVORITE_LIST_SUCCESS: 
      return {
        ...state,
        favoriteList: action.payload
      }

    default: 
      return state
  }
}