import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchOneProduct } from '../redux/actions'
import { RootState } from 'redux/reducer'

export default function useProduct(productId: string) {
  const dispatch = useDispatch()

  const { allProducts, searchedProducts, singleProduct } = 
    useSelector((state: RootState) => ({
      allProducts: state.product.products,
      searchedProducts: state.product.searchedProducts,
      singleProduct: state.product.singleProduct
  })
  )

  useEffect(() => {
    dispatch(fetchAllProducts())
    dispatch(fetchOneProduct(productId))
  }, [dispatch, productId])

  return {
    allProducts,
    searchedProducts,
    singleProduct
  }
}