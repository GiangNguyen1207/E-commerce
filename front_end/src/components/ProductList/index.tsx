import React from 'react'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';

import { Product } from '../../type';
import SingleProduct from '../SingleProduct'
import './product.css'

type ListProps = {
  products: Product[]
}

const ProductList = ({ products }: ListProps) => {
  const history = useHistory()

  const takeProductId = (id: string) => {
    history.push(`/products/${id}`)
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
            <SingleProduct 
              _id={p._id}
              key={p.name}
              name={p.name}
              image={p.image}
              category={p.category}
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
