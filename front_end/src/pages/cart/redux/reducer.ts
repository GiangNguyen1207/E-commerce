import {
  ADD_PRODUCT_TO_CART_SUCCESS,
  CartActions,
  CartState
} from './types'

const initialState: CartState = {
  cart: undefined
}

export function cart(state: CartState = initialState, action: CartActions) : CartState {
  switch(action.type) {
    case ADD_PRODUCT_TO_CART_SUCCESS: 
      return {
        ...state,
        cart: action.payload
      }
    default: 
      return state
  }
}