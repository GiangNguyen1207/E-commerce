import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppBarComponent from '../components/AppBar'
import CarouselComponent from '../components/Carousel';
import { useProductService } from '../services/productService'
import { useUserService } from '../services/userService'

const Home = () => {
  const dispatch = useDispatch()

  const { fetchProducts } = useProductService(dispatch)

  useEffect(() => {
    fetchProducts()
  },[])

  return (
    <div>
      <AppBarComponent />
      <CarouselComponent />
    </div>
  )
}

export default Home;
