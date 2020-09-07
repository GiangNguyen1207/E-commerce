import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CarouselComponent from 'components/Carousel';
import { useProductService } from 'services/productService'

const Home = () => {
  const dispatch = useDispatch()

  const { fetchProducts } = useProductService(dispatch)

  useEffect(() => {
    fetchProducts()
  },[fetchProducts])

  return (
    <div>
      <CarouselComponent />
    </div>
  )
}

export default Home;
