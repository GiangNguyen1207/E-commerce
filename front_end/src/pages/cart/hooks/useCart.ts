import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";

import { getCart } from 'pages/cart/redux/actions'
import useAuth from 'pages/auth/hooks/useAuth';

export default function useCart() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const cart = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    dispatch(getCart(user?._id))
  }, [dispatch, user])
  
  return cart
}