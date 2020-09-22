import { Cart } from 'pages/auth/redux/types'
import { 
  ADD_PRODUCT_TO_CART,
  ADD_PRODUCT_TO_CART_SUCCESS,
  GET_CART,
  GET_CART_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  INCREASE_QUANTITY,
  INCREASE_QUANTITY_SUCCESS,
  DECREASE_QUANTITY,
  DECREASE_QUANTITY_SUCCESS,
  ADD_PRODUCT_TO_FAVORITE_LIST,
  ADD_PRODUCT_TO_FAVORITE_LIST_SUCCESS,
  GET_FAVORITE_LIST,
  GET_FAVORITE_LIST_SUCCESS,
  CartActions,
  FavoriteList,
} from './types'

export function addProductToCart(
  userId: string | undefined,
  productName: string,
  productVariant: string,
  productId: string,
  price: number
) : CartActions {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: {
      userId,
      productName,
      productVariant,
      productId,
      price
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

export function increaseQuantity(userId: string | undefined, productId: string) : CartActions {
  return {
    type: INCREASE_QUANTITY,
    payload: {
      userId,
      productId
    }
  }
}

export function increaseQuantitySuccess(cart: Cart[]) : CartActions {
  return {
    type: INCREASE_QUANTITY_SUCCESS,
    payload: cart
  }
}

export function decreaseQuantity(userId: string | undefined, productId: string) : CartActions {
  return {
    type: DECREASE_QUANTITY,
    payload: {
      userId,
      productId
    }
  }
}

export function decreaseQuantitySuccess(cart: Cart[]) : CartActions {
  return {
    type: DECREASE_QUANTITY_SUCCESS,
    payload: cart
  }
}

export function addProductToFavoriteList(
  userId: string | undefined, 
  productId: string,
  productName: string,
  productVariant: string,
  image: string,
  price: number
  ) : CartActions {
  return {
    type: ADD_PRODUCT_TO_FAVORITE_LIST,
    payload: {
      userId,
      productId,
      productName,
      productVariant,
      image,
      price
    }
  }
}

export function addProductToFavoriteListSuccess(favoriteList: FavoriteList[]) : CartActions {
  return {
    type: ADD_PRODUCT_TO_FAVORITE_LIST_SUCCESS,
    payload: favoriteList
  }
}

export function getFavoriteList(userId: string | undefined) : CartActions {
  return {
    type: GET_FAVORITE_LIST,
    payload: userId
  }
}

export function getFavoriteListSuccess(favoriteList: FavoriteList[]) : CartActions {
  return {
    type: GET_FAVORITE_LIST_SUCCESS,
    payload: favoriteList
  }
}