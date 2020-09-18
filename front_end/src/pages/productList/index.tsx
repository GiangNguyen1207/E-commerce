import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'
import _orderBy from 'lodash/orderBy'
import _filter from 'lodash/filter'

import ProductList from 'components/ProductList'
import SearchBar from 'components/SearchBar'
import useProduct from './hooks/useProduct';
import Sort from 'components/Sort';
import Filter from 'components/Filter';
import { Product } from 'pages/productList/redux/types';
import { findProducts } from './redux/actions';
import './styles.css'

const SearchProducts = () => {
  const dispatch = useDispatch()
  const { allProducts, searchedProducts } = useProduct('')
  const [sortValue, setsortValue] = useState<string>('')
  const [filterValues, setFilterValues] = useState<string[]>([])
  const names = Array.from(new Set(allProducts.map(p => p.name.split(' -')[0])))
  const categories = Array.from(new Set(allProducts.map(p => p.category)))
  const variants = Array.from(new Set(allProducts.map(p => p.variant)))
  let sortedProducts;
  let filterByName: string[] = []
  let filterByCategory: string[] = []
  let filterByVariant: string[] = []
  let filteredProducts: Product[] = []; 

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

  filterValues.map(value => {
    names.includes(value) ? 
      filterByName.push(value) : 
    categories.includes(value) ? 
      filterByCategory.push(value) :
      filterByVariant.push(value)
  })

  if(!_isEmpty(filterByName)) {
    filterByName.map(value => {
      const newArr = allProducts.filter(p => p.name.split(' -')[0] === value)
      filteredProducts = [...filteredProducts, ...newArr]
    })
    if(!_isEmpty(filterByCategory)) {
      filterByCategory.map(value => {
        filteredProducts = filteredProducts.filter(p => p.category === value)
      })
    }
    if(!_isEmpty(filterByVariant)) {
      filterByVariant.map(value => {
        filteredProducts = filteredProducts.filter(p => p.variant === value)
      })
    } 
  } else if(_isEmpty(filterByName)) {
      if(!_isEmpty(filterByCategory)) {
        filterByCategory.map(value => {
          const newArr = allProducts.filter(p => p.category === value)
          filteredProducts = [...filteredProducts, ...newArr]
        })
        if(!_isEmpty(filterByVariant)) {
          filterByCategory.map(value => {
            filteredProducts = filteredProducts.filter(p => p.variant === value)
          })
        }
      }
      if(!_isEmpty(filterByVariant)) {
        filterByVariant.map(value => {
          const newArr = allProducts.filter(p => p.variant === value)
          filteredProducts = [...filteredProducts, ...newArr]
        })
      }
  }

  if (sortValue === 'Price (Low to High)') {
    sortedProducts = _orderBy(!_isEmpty(filteredProducts) ? filteredProducts : allProducts, 'price', 'asc')
  } else if (sortValue === 'Price (High to Low)') {
    sortedProducts = _orderBy(!_isEmpty(filteredProducts) ? filteredProducts : allProducts, 'price', 'desc')
  } else if (sortValue === 'Name (Asc)') {
    sortedProducts = _orderBy(!_isEmpty(filteredProducts) ? filteredProducts : allProducts, 'name', 'asc')
  } else sortedProducts = _orderBy(!_isEmpty(filteredProducts) ? filteredProducts : allProducts, 'name', 'desc')

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
            names={names}
            categories={categories}
            variants={variants}
            filterValues={filterValues}
            handleChange={handleFilterChange}
            onButtonClick={()=>setFilterValues([])}
          />
        </div>
        <ProductList 
          products={ 
              sortValue ? sortedProducts 
              : !_isEmpty(filteredProducts) ? filteredProducts 
              : !_isEmpty(searchedProducts) ? searchedProducts
              : allProducts
          }
          />
        </div>
      </div>  
    </>
  )
}

export default SearchProducts