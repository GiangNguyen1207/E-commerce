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
            <SingleProduct 
              _id={p._id}
              key={p.name}
              name={p.name.split('-')[0]}
              image={p.image}
              category={p.category}
              variant={p.variant}
              shortDescription={p.shortDescription}
              longDescription={p.longDescription}
              price={p.price}
              takeProductId={takeProductId}
            />
          )})}
      </Grid>
    </div>
  )
}

export default ProductList
