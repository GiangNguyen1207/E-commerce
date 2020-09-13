import { Cart } from 'pages/auth/redux/types'
import { 
  ADD_PRODUCT_TO_CART,
  ADD_PRODUCT_TO_CART_SUCCESS,
  GET_CART,
  GET_CART_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  CartActions,
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

export function getCart(userId: string | undefined ) : CartActions {
  return {
    type: GET_CART,
    payload: userId
  }
}

export function getCartSuccess(cart: Cart[]) : CartActions {
  return {
    type: GET_CART_SUCCESS,
    payload: cart
  }
}

export function deleteProduct(userId: string | undefined, productId: string) : CartActions {
  return {
    type: DELETE_PRODUCT,
    payload: {
      userId,
      productId
    }
  }
}

export function deleteProductSuccess(cart: Cart[]) : CartActions {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: cart
  }
}