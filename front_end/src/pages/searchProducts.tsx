import React, {useState} from 'react'

import AppBarComponent from '../components/AppBar'
import ProductList from '../components/ProductList'
import useProduct from '../hooks/useProduct';
import SearchBar from '../components/Search'
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty'

import { Product } from '../type';

const SearchProducts = () => {
  const [input, setInput] = useState('')
  const [filterProducts, setFilterProducts] = useState<Product[]>([])
  const {productList} = useProduct(input)

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) : void=> {
    setInput(event.target.value)
  }

  const handleSearch = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await axios.get(`http://localhost:3000/api/v1/products/?search=${input}`)
    setFilterProducts(res.data)
    console.log(filterProducts)
  } 

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
          products={!_isEmpty(filterProducts)? filterProducts : list}
        />
      </div>  
    </>
  )
}

export default SearchProducts