import {
  GET_CART_SUCCESS,
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
    case GET_CART_SUCCESS: 
      return {
        ...state,
        cart: action.payload
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