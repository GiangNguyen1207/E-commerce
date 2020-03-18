import React, {useState} from 'react'

import AppBarComponent from '../components/AppBar'
import ProductList from '../components/ProductList'
import useProduct from '../hooks/useProduct';
import SearchBar from '../components/Search'
import axios from 'axios';

import { Product } from '../type';

const SearchProducts = () => {
  const [input, setInput] = useState('')
  const [filterProducts, setFilterProducts] = useState<Product[]>([])
  const {productList} = useProduct()

  const search = async() => {
    const res = await axios.get(`http://localhost:3000/api/v1/products/?search=${input}`)
      setFilterProducts(res.data)
  }

  const localProducts = localStorage.getItem('Products')
  const localProductList: Product[] = JSON.parse(localProducts || '')

  let list: Product[] = []
  if(localProductList) {
    list = localProductList
  } else list = productList

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    setInput(event.target.value)}
    search()
  
  return(
    <>
      <AppBarComponent /> 
      <div style={{backgroundColor: '#ffc0cb63'}}>
        <SearchBar 
          input={input}
          handlerSearch={searchHandler}
        />
        <ProductList 
          products={filterProducts? filterProducts : list}
        />
      </div>
    </>
  )
}

export default SearchProducts