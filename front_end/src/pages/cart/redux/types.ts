import { Cart } from 'pages/auth/redux/types'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const GET_CART = 'GET_CART'
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const ADD_PRODUCT_TO_FAVORITE_LIST = 'ADD_PRODUCT_TO_FAVORITE_LIST'
export const GET_FAVORITE_LIST = 'GET_FAVORITE_LIST'
export const GET_FAVORITE_LIST_SUCCESS = 'GET_FAVORITE_LIST_SUCCESS'
export const DELETE_PRODUCT_FAVORITE_LIST = 'DELETE_PRODUCT_FAVORITE_LIST'

export type AddProductToCartAction = {
  type: typeof ADD_PRODUCT_TO_CART,
  payload: {
    userId: string | undefined,
    productName: string,
    productVariant: string,
    productId: string,
    price: number
  }
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

export type IncreaseQuantityAction = {
  type: typeof INCREASE_QUANTITY,
  payload: {
    userId: string | undefined,
    productId: string
  }
}

export type DecreaseQuantityAction = {
  type: typeof DECREASE_QUANTITY,
  payload: {
    userId: string | undefined,
    productId: string
  }
}

export type FavoriteList = {
  productId: string,
  productName: string,
  productVariant: string,
  image: string,
  price: number
}

export type AddProductToFavoriteListAction = {
  type: typeof ADD_PRODUCT_TO_FAVORITE_LIST,
  payload: {
    userId: string | undefined,
    productId: string,
    productName: string,
    productVariant: string,
    image: string,
    price: number
  }
}

export type GetFavoriteListAction = {
  type: typeof GET_FAVORITE_LIST,
  payload: string | undefined
}

export type GetFavoriteListSuccessAction = {
  type: typeof GET_FAVORITE_LIST_SUCCESS,
  payload: FavoriteList[]
}

export type DeleteProductInFavoriteListAction = {
  type: typeof DELETE_PRODUCT_FAVORITE_LIST
  payload: {
    userId: string | undefined,
    productId: string
  }
}

export type CartState = {
  cart?: Cart[],
  favoriteList?: FavoriteList[]
}

export type CartActions = 
  | AddProductToCartAction
  | GetCartAction
  | GetCartSuccessAction
  | DeleteProductAction
  | IncreaseQuantityAction
  | DecreaseQuantityAction
  | AddProductToFavoriteListAction
  | GetFavoriteListAction
  | GetFavoriteListSuccessAction  
  | DeleteProductInFavoriteListAction
