import {
  Product,
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_SUCCESS,
  FIND_PRODUCTS,
  FIND_PRODUCTS_SUCCESS,
  FETCH_ONE_PRODUCT,
  FETCH_ONE_PRODUCT_SUCCESS,
  ProductActions,
} from './types'

export function fetchAllProducts(page: number): ProductActions {
  return {
    type: FETCH_ALL_PRODUCTS,
    payload: page,
  }
}

export function fetchAllProductsSuccess(
  pages: number,
  products: Product[]
): ProductActions {
  return {
    type: FETCH_ALL_PRODUCTS_SUCCESS,
    payload: {
      totalPages: pages,
      allProducts: products,
    },
  }
}

export function findProducts(query: string): ProductActions {
  return {
    type: FIND_PRODUCTS,
    payload: query,
  }
}

export function findProductsSuccess(products: Product[]): ProductActions {
  return {
    type: FIND_PRODUCTS_SUCCESS,
    payload: products,
  }
}

export function fetchOneProduct(productId: string): ProductActions {
  return {
    type: FETCH_ONE_PRODUCT,
    payload: productId,
  }
}

export function fetchOneProductSucess(product: Product): ProductActions {
  return {
    type: FETCH_ONE_PRODUCT_SUCCESS,
    payload: product,
  }
}
