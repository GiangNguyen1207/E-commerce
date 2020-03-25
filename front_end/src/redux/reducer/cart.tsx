import {
  CartState,
  CartActions, 
  SEND_CART_TO_STORE,
} from '../../type'

const initialState: CartState = {
  productsInCart: [],
}

const CartReducer = (state = initialState, action: CartActions): CartState => {
  switch(action.type) {
    case SEND_CART_TO_STORE: 
      return {
        ...state,
        productsInCart: action.payload.cart
      }

    default:
    return state
  }
}

export default CartReducer