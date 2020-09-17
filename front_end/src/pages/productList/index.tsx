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
  const { allProducts, filteredProducts} = useProduct('')
  const [sortValue, setsortValue] = useState<string>('')
  const [filterValues, setFilterValues] = useState<string[]>([])
  let sortedProducts;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(findProducts(event.target.value))
  } 

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'None') {
      setsortValue('')
    } else setsortValue(event.target.value as string)
  }

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterValues(event.target.value as string[]);
  };

  if (sortValue === 'Price (Low to High)') {
    sortedProducts = _orderBy(allProducts, 'price', 'asc')
  } else if (sortValue === 'Price (High to Low)') {
    sortedProducts = _orderBy(allProducts, 'price', 'desc')
  } else if (sortValue === 'Name (Asc)') {
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
            sortValue={sortValue}
            handleChange={handleChange}
          />
          <Filter 
            allProducts={allProducts}
            filterValues={filterValues}
            handleChange={handleFilterChange}
            onButtonClick={()=>setFilterValues([])}
          />
        </div>
        <ProductList 
          products={
            sortValue ? 
              sortedProducts 
              : !_isEmpty(filteredProducts) ? 
                filteredProducts 
                : allProducts
          }
          />
        </div>
      </div>  
    </>
  )
}

export default SearchProducts