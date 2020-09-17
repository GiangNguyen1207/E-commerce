import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'
import _orderBy from 'lodash/orderBy'

import ProductList from 'components/ProductList'
import SearchBar from 'components/SearchBar'
import useProduct from './hooks/useProduct';
import Sort from 'components/Sort';
import Filter from 'components/Filter';
import { findProducts } from './redux/actions';
import './styles.css'

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
    if (event.target.value === 'None') {
      setSelect('')
    } else setSelect(event.target.value as string)
  }

  if (select === 'Price (Low to High)') {
    sortedProducts = _orderBy(allProducts, 'price', 'asc')
  } else if (select === 'Price (High to Low)') {
    sortedProducts = _orderBy(allProducts, 'price', 'desc')
  } else if (select === 'Name (Asc)') {
    sortedProducts = _orderBy(allProducts, 'name', 'asc')
  } else sortedProducts = _orderBy(allProducts, 'name', 'desc')
  
  return(
    <>
      <div className='product-container'>
        <div className='products'>
          <SearchBar 
            handleSearch={handleSearch}
          />
        <div className='products-action'>
          <Sort 
            select={select}
            handleChange={handleChange}
          />
          <Filter />
        </div>
        <ProductList 
          products={
            select ? sortedProducts 
            : !_isEmpty(filteredProducts) ? filteredProducts 
            : allProducts
          }
          />
        </div>
      </div>  
    </>
  )
}

export default SearchProducts