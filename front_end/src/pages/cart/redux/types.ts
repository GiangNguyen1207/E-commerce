import { Cart } from 'pages/auth/redux/types'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS'
export const GET_CART = 'GET_CART'
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const INCREASE_QUANTITY_SUCCESS = 'INCREASE_QUANTITY_SUCCESS'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const DECREASE_QUANTITY_SUCCESS = 'DECREASE_QUANTITY_SUCCESS'

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

export type GetCartAction = {
  type: typeof GET_CART,
  payload: string | undefined
}

export type GetCartSuccessAction = {
  type: typeof GET_CART_SUCCESS,
  payload: Cart[]
}

export type DeleteProductAction = {
  type: typeof DELETE_PRODUCT,
  payload: {
    userId: string | undefined,
    productId: string
  }
}

export type DeleteProductSuccessAction = {
  type: typeof DELETE_PRODUCT_SUCCESS,
  payload: Cart[]
}

export type IncreaseQuantityAction = {
  type: typeof INCREASE_QUANTITY,
  payload: {
    userId: string | undefined,
    productId: string
  }
}

export type IncreaseQuantitySuccessAction = {
  type: typeof INCREASE_QUANTITY_SUCCESS,
  payload: Cart[]
}

export type DecreaseQuantityAction = {
  type: typeof DECREASE_QUANTITY,
  payload: {
    userId: string | undefined,
    productId: string
  }
}

export type DecreaseQuantitySuccessAction = {
  type: typeof DECREASE_QUANTITY_SUCCESS,
  payload: Cart[]
}

export type CartState = {
  cart?: Cart[]
}

export type CartActions = 
  | AddProductToCartAction
  | AddProductToCartSuccessAction
  | GetCartAction
  | GetCartSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | IncreaseQuantityAction
  | IncreaseQuantitySuccessAction
  | DecreaseQuantityAction
  | DecreaseQuantitySuccessAction
