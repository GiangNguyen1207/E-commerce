import React from 'react'
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';

import useCart from 'pages/cart/hooks/useCart'
import ProductCard from 'components/ProductCard'

const FavoriteList = () => {
  const history = useHistory()
  const { favoriteList } = useCart()

  const takeProductId = (productId: string) => {
    history.push(`/products/${productId}`)
  }
  return(
    <>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
        wrap='wrap'
      >
        {favoriteList?.map(p => {
          return (
            <ProductCard 
              _id={p.productId}
              name={p.productName}
              variant={p.productVariant}
              image={p.productName}
              price={p.price}
              takeProductId={takeProductId}
            />
          )
        })}
      </Grid>
    </>
  )
}

export default FavoriteList