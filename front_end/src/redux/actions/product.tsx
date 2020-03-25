import {
  Product,
  SEND_DATA,
  SEND_SINGLE_PRODUCT,
  SEND_FILTERED_PRODUCTS,
  SendDataToStore,
  SendSingleProduct,
  SendFilteredProducts
} from '../../type'

export function sendData(products: Product[]) : SendDataToStore {
  return {
    type: SEND_DATA,
    payload: {
      products
    }
  }
}

export function sendSingleProductToStore(product: Product) : SendSingleProduct {
  return {
    type: SEND_SINGLE_PRODUCT,
    payload: {
      product
    }
  }
}

export function sendFilteredProductToStore(filteredProducts: Product[]) : SendFilteredProducts {
  return {
    type: SEND_FILTERED_PRODUCTS,
    payload: {
      filteredProducts
    }
  }
}
