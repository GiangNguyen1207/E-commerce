export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
export const FETCH_ALL_PRODUCTS_SUCCESS = 'FETCH_ALL_PRODUCTS_SUCCESS'
export const FIND_PRODUCTS = 'FIND_PRODUCTS'
export const FIND_PRODUCTS_SUCCESS = 'FIND_PRODUCTS_SUCCESS'
export const FETCH_ONE_PRODUCT = 'FIND_ONE_PRODUCT'
export const FETCH_ONE_PRODUCT_SUCCESS = 'FIND_ONE_PRODUCT_SUCCESS'

export type Product = {
  _id: string
  name: string
  category: string
  variant: string
  image: string
  shortDescription: string
  longDescription: string
  price: number
}

export type FetchAllProductsAction = {
  type: typeof FETCH_ALL_PRODUCTS
  payload: number
}

export type FetchAllProductsSuccessAction = {
  type: typeof FETCH_ALL_PRODUCTS_SUCCESS
  payload: {
    totalPages: number
    allProducts: Product[]
  }
}

export type FindProductsAction = {
  type: typeof FIND_PRODUCTS
  payload: string
}

export type FindProductsSuccessAction = {
  type: typeof FIND_PRODUCTS_SUCCESS
  payload: Product[]
}

export type FetchOneProductAction = {
  type: typeof FETCH_ONE_PRODUCT
  payload: string
}

export type FetchOneProductSuccessAction = {
  type: typeof FETCH_ONE_PRODUCT_SUCCESS
  payload: Product
}

export type ProductState = {
  products: {
    totalPages: number
    products: Product[]
  }
  searchedProducts: Product[]
  singleProduct?: Product
}

export type ProductActions =
  | FetchAllProductsAction
  | FetchAllProductsSuccessAction
  | FindProductsAction
  | FindProductsSuccessAction
  | FetchOneProductAction
  | FetchOneProductSuccessAction
