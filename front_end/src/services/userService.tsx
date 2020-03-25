import axios from 'axios' 

import { sendCartToStore } from '../redux/actions/cart'

export const useUserService: Function = (history: any, dispatch: Function) => {

  const token = localStorage.getItem('id_token')

  const signUp = async(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    ) => {
      try {
        const res = await axios.post('http://localhost:3000/api/v1/users/signUp', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      })
      if(res.data.message === 'Success') {
        return (
          history.push('/user/signIn')
        )
      } 
        } catch(error) {
            alert('Username or email is already registered. Please sign in or choose another username and email')
        }
      }

  const logIn = async(
    username: string,
    password: string
  ) => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/signIn', {
        username: username,
        password: password,
    })
    await localStorage.setItem('id_token', res.data.token)

    await localStorage.setItem('user', res.data.user.username)

    await localStorage.setItem('userId', res.data.user._id)

    if(res.data.user) {
      return (
        history.push('/')
      )
    } 
    } catch(error) {
      alert('Username or password incorrect')
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const addToCart = async(
    userId: string, 
    product: object,
    productId: string
  ) => {
    await axios.post(`http://localhost:3000/api/v1/users/cart/${userId}`, 
    {
      userId: userId,
      product: product,
      productId: productId
    },
    config,
    )
    getCart(userId)
  }

  const getCart = async(
    userId: string
  ) => {
    const res = await axios.get(`http://localhost:3000/api/v1/users/cart/${userId}`,
    config,
    )
    dispatch(sendCartToStore(res.data.cart))
  }

  const deleteProduct = async(
    userId: string,
    productId: string,
  ) => {
    await axios.delete(`http://localhost:3000/api/v1/users/cart/${userId}`, 
    {
      data: {userId, productId},
      headers: {Authorization: `Bearer ${token}`}
    })
    getCart(userId)
  }

  const increaseQuantity = async(
    userId: string,
    productId: string,
  ) => {
    await axios.put(`http://localhost:3000/api/v1/users/cart/increase/${userId}`, 
    {
      userId: userId,
      productId: productId
    },
    config
    )
    getCart(userId)
  }

  const decreaseQuantity = async(
    userId: string,
    productId: string,
  ) => {
    await axios.put(`http://localhost:3000/api/v1/users/cart/decrease/${userId}`, 
    {
      userId: userId,
      productId: productId
    },
    config
    )
    getCart(userId)
  }

  return { 
    signUp, 
    logIn, 
    addToCart, 
    getCart, 
    deleteProduct, 
    increaseQuantity,
    decreaseQuantity
  }
};




  
  