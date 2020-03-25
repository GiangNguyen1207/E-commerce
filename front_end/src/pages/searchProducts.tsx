import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty'

import AppBarComponent from '../components/AppBar'
import ProductList from '../components/ProductList'
import SearchBar from '../components/Search'
import { useProductService } from '../services/productService'
import { Product, AppState } from '../type';

const SearchProducts = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const { fetchProducts, findProducts } = useProductService(dispatch)

  useEffect(() => {
    fetchProducts()
  },[])

  const productList = useSelector((state: AppState) => state.product.products)

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) : void=> {
    setInput(event.target.value)
  }

  const handleSearch = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    findProducts(input)
  } 

  const filteredProducts = useSelector((state: AppState) => state.product.filteredProducts)

  const localProducts = localStorage.getItem('Products')
  const localProductList: Product[] = JSON.parse(localProducts || '')

  let list: Product[] = []
  if(localProductList) {
    list = localProductList
  } else list = productList
  
  return(
    <>
      <AppBarComponent /> 
      <div style={{backgroundColor: 'rgba(255, 192, 203, 0.24)'}}>
        <SearchBar 
          input={input}
          inputHandler={inputHandler}
          handleSearch={handleSearch}
        />
        <ProductList 
          products={!_isEmpty(filteredProducts)? filteredProducts : list}
        />
      </div>  
    </>
  )
}

export default SearchProducts