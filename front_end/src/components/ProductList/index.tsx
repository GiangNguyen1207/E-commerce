import React from 'react'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';

import { Product } from '../../type';
import ProductCard from '../ProductCard'
import './product.css'

type ListProps = {
  products: Product[]
}

const ProductList = ({ products }: ListProps) => {
  const history = useHistory()

  const takeProductId = (productId: string) => {
    history.push(`/products/${productId}`)
  }

  return (
    <div className='list'>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
        wrap='wrap'
      >
        {products.map(p => {
          return(
            <ProductCard 
              _id={p._id}
              key={p.name}
              name={p.name.split('-')[0]}
              image={p.image}
              variant={p.variant}
              price={p.price}
              takeProductId={takeProductId}
            />
          )})}
      </Grid>
    </div>
  )
}

export default ProductList
