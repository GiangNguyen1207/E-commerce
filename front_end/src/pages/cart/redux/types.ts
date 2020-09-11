import { Cart } from 'pages/auth/redux/types'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS'

export type AddProductToCartAction = {
  type: typeof ADD_PRODUCT_TO_CART,
  payload: {
    userId: string,
    productName: string,
    productVariant: string,
    productId: string
  }
}

export type AddProductToCartSuccessAction = {
  type: typeof ADD_PRODUCT_TO_CART_SUCCESS,
  payload: Cart[]
}

export type CartState = {
  cart?: Cart[]
}

export type CartActions = 
  | AddProductToCartAction
  | AddProductToCartSuccessAction
