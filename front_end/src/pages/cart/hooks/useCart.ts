import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";

import { getCart, getFavoriteList } from 'pages/cart/redux/actions'
import useAuth from 'pages/auth/hooks/useAuth';

export default function useCart() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { cart, favoriteList } = useSelector((state: RootState) => ({
    cart: state.cart.cart,
    favoriteList: state.cart.favoriteList
  })
  )

  useEffect(() => {
    if(user) {
      dispatch(getCart(user?._id))
      dispatch(getFavoriteList(user?._id))
    }
  }, [dispatch, user])
  
  return {
    cart,
    favoriteList
  }
}