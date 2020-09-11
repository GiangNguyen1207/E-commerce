import { Cart } from 'pages/auth/redux/types'
import { 
  ADD_PRODUCT_TO_CART,
  ADD_PRODUCT_TO_CART_SUCCESS,
  CartActions
} from './types'

export function addProductToCart(
  userId: string,
  productName: string,
  productVariant: string,
  productId: string
) : CartActions {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: {
      userId,
      productName,
      productVariant,
      productId
    }
  }
}

export function addProductToCartSuccess(cart: Cart[]) : CartActions {
  return {
    type: ADD_PRODUCT_TO_CART_SUCCESS,
    payload: cart
  }
}