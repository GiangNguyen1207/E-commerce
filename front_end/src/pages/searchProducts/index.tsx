import React from 'react'
import { useDispatch } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'

import ProductList from 'components/ProductList'
import SearchBar from 'components/Search'
import useProduct from './hooks/useProduct';
import { findProducts } from './redux/actions';

const SearchProducts = () => {
  const dispatch = useDispatch()
  const { allProducts, filteredProducts} = useProduct('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(findProducts(event.target.value))
  } 
  
  return(
    <>
      <div style={{backgroundColor: 'rgba(255, 192, 203, 0.24)'}}>
        <SearchBar 
          handleSearch={handleSearch}
        />
        <ProductList 
          products={!_isEmpty(filteredProducts)? filteredProducts : allProducts}
        />
      </div>  
    </>
  )
}

export default SearchProducts