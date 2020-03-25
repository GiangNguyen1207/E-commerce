import {
  Cart,
  SEND_CART_TO_STORE,
  SendCartToSotre,
} from '../../type'

export function sendCartToStore(cart: Cart[]): SendCartToSotre {
  return {
    type: SEND_CART_TO_STORE,
    payload: {
      cart,
    }
  }
}
