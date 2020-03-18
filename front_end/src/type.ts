export const ADD_PRODUCT = 'ADD_PRODUCT';
export const INCREASE_PRODUCT = 'INCREASE_PRODUCT';
export const DECREASE_PRODUCT = 'DECREASE_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const NO_PRODUCT = 'NO_PRODUCT'
export const SEND_DATA = 'SEND_DATA'

export type Product = {
  _id: string,
  name: string,
  category: string,
  variant: string,
  image: string,
  price: number,
}

export type SendDataToStore = {
  type: typeof SEND_DATA
  payload: {
    products: Product[]
  }
}

export type AddProduct = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type IncreaseProduct = {
  type: typeof INCREASE_PRODUCT
  payload: {
    quantity: number
  }
}

export type DecreaseProduct = {
  type: typeof DECREASE_PRODUCT
  payload: {
    quantity: number
  }
}

export type RemoveProduct = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

export type ZeroProduct = {
  type: typeof NO_PRODUCT
  payload: {
    deleted: number
  }
}

export type ProductActions = 
  | SendDataToStore

export type CartActions = 
  | AddProduct
  | IncreaseProduct
  | DecreaseProduct
  | RemoveProduct
  | ZeroProduct

export type ProductState = {
  products: Product[]
}

export type CartState = {
  productCart: Product[],
  quantity: number,
  deleted: number,
} 

export type AppState = {
  cart: CartState,
  product: ProductState
}