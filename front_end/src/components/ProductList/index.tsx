import React from 'react'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import _isEmpty from 'lodash/isEmpty'
import Typography from '@material-ui/core/Typography';

import { Product } from 'pages/productList/redux/types';
import ProductCard from '../ProductCard'

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
        {!_isEmpty(products) ? products.map(p => {
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
          )}) : <Typography variant="h5">No products found</Typography>
        }
      </Grid>
    </div>
  )
}

export default ProductList
