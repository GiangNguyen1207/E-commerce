import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'
import _orderBy from 'lodash/orderBy'

import ProductList from 'components/ProductList'
import SearchBar from 'components/SearchBar'
import useProduct from './hooks/useProduct';
import Sort from 'components/Sort';
import { findProducts } from './redux/actions';

const SearchProducts = () => {
  const dispatch = useDispatch()
  const [select, setSelect] = useState('')
  const { allProducts, filteredProducts} = useProduct('')
  let sortedProducts;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(findProducts(event.target.value))
  } 

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'none') {
      setSelect('')
    } else setSelect(event.target.value as string)
  }

  if (select === 'priceAsc') {
    sortedProducts = _orderBy(allProducts, 'price', 'asc')
  } else if (select === 'priceDesc') {
    sortedProducts = _orderBy(allProducts, 'price', 'desc')
  } else if (select === 'nameAsc') {
    sortedProducts = _orderBy(allProducts, 'name', 'asc')
  } else sortedProducts = _orderBy(allProducts, 'name', 'desc')
  
  return(
    <>
      <div style={{backgroundColor: 'rgba(255, 192, 203, 0.24)'}}>
        <SearchBar 
          handleSearch={handleSearch}
        />
        <Sort 
          select={select}
          handleChange={handleChange}
        />
        <ProductList 
          products={
            select ? sortedProducts 
            : !_isEmpty(filteredProducts) ? filteredProducts 
            : allProducts
          }
        />
      </div>  
    </>
  )
}

export default SearchProducts