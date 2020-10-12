import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchOneProduct } from '../redux/actions'
import { RootState } from 'redux/reducer'

export default function useProduct(productId: string) {
  const dispatch = useDispatch()

  const {
    totalPages,
    allProducts,
    searchedProducts,
    singleProduct,
  } = useSelector((state: RootState) => ({
    totalPages: state.product.products.totalPages,
    allProducts: state.product.products.products,
    searchedProducts: state.product.searchedProducts,
    singleProduct: state.product.singleProduct,
  }))

  useEffect(() => {
    dispatch(fetchAllProducts(1))
    dispatch(fetchOneProduct(productId))
  }, [dispatch, productId])

  return {
    totalPages,
    allProducts,
    searchedProducts,
    singleProduct,
  }
}
