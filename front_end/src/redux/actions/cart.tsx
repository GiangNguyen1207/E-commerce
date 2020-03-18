import {
  Product,
  ADD_PRODUCT,
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  REMOVE_PRODUCT,
  NO_PRODUCT,
  AddProduct,
  IncreaseProduct,
  RemoveProduct,
  DecreaseProduct,
  ZeroProduct,
} from '../../type'

export function addProductToCart(product: Product): AddProduct {
  return {
    type: ADD_PRODUCT,
    payload: {
      product,
    }
  }
}

export function increaseProduct(quantity: number): IncreaseProduct {
  return {
    type: INCREASE_PRODUCT,
    payload: {
      quantity,
    }
  }
}

export function decreaseProduct(quantity: number): DecreaseProduct {
  return {
    type: DECREASE_PRODUCT,
    payload: {
      quantity,
    }
  }
}

export function removeProductFromCart(product: Product): RemoveProduct {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product,
    }
  }
}

export function setQuantityToZero(deleted: number): ZeroProduct {
  return {
    type: NO_PRODUCT,
    payload: {
      deleted
    }
  }
}