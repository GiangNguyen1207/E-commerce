import axios from 'axios'

import { sendData, sendSingleProductToStore, sendFilteredProductToStore } from '../redux/actions/product'
import { useUserService } from '../services/userService'

export const useProductService: Function = (dispatch: Function) => {

  const { getCart } = useUserService('', dispatch)
  
  const userId = localStorage.getItem('userId')

  const fetchProducts = async() => {
    const res = await axios.get('http://localhost:3000/api/v1/products/')
    dispatch(sendData(res.data))
    getCart(userId)
  }

  const fetchProductById = async(
    productId: string
    ) => {
    const res = await axios.get(`http://localhost:3000/api/v1/products/${productId}`)
    dispatch(sendSingleProductToStore(res.data))
    getCart(userId)
  }

  const findProducts = async(
    input: string
  ) => {
    const res = await axios.get(`http://localhost:3000/api/v1/products/?search=${input}`)
    dispatch(sendFilteredProductToStore(res.data))
  }

  return {
    fetchProducts,
    fetchProductById,
    findProducts
  }
} 
