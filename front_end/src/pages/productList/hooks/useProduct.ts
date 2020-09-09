import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchOneProduct } from '../redux/actions'
import { AppState } from 'type'

export default function useProduct(productId: string) {
  const dispatch = useDispatch()

  const { allProducts, filteredProducts, singleProduct } = 
    useSelector((state: AppState) => ({
      allProducts: state.product.products,
      filteredProducts: state.product.filteredProducts,
      singleProduct: state.product.singleProduct
  })
  )

  useEffect(() => {
    dispatch(fetchAllProducts())
    dispatch(fetchOneProduct(productId))
  }, [dispatch, productId])

  return {
    allProducts,
    filteredProducts,
    singleProduct
  }
}