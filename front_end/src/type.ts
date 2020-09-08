export const SEND_CART_TO_STORE = 'SEND_CART_TO_STORE';
export const SEND_DATA = 'SEND_DATA'
export const SEND_SINGLE_PRODUCT = 'SEND_SINGLE_PRODUCT'
export const SEND_FILTERED_PRODUCTS = 'SEND_FILTERED_PRODUCTS'

export type Product = {
  _id: string,
  name: string,
  category: string,
  variant: string,
  image: string,
  shortDescription: string,
  longDescription: string
  price: number,
}

export type Details = {
  _id: string,
  name: string,
  image: string,
  price: number,
  category: string,
  variant: string,
  shortDescription?: string
  longDescription?: string,
}

export type Cart = {
  _id: string,
  product: Product,
  productId: string,
  quantity: number
}

export type SendDataToStore = {
  type: typeof SEND_DATA
  payload: {
    products: Product[]
  }
}

export type SendSingleProduct = {
  type: typeof SEND_SINGLE_PRODUCT
  payload: {
    product: Product
  }
}

export type SendFilteredProducts = {
  type: typeof SEND_FILTERED_PRODUCTS
  payload: {
    filteredProducts: Product[]
  }
}

export type SendCartToSotre = {
  type: typeof SEND_CART_TO_STORE
  payload: {
    cart: Cart[]
  }
}

export type ProductActions = 
  | SendDataToStore
  | SendSingleProduct
  | SendFilteredProducts

export type CartActions = 
  | SendCartToSotre

export type ProductState = {
  products: Product[],
  singleProduct: Details,
  filteredProducts: Product[]
}

export type CartState = {
  productsInCart: Cart[],
} 

export type AppState = {
  cart: CartState,
  product: ProductState
}