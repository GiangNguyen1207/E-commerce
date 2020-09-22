import React from 'react'
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';

import useCart from 'pages/cart/hooks/useCart'
import ProductCard from 'components/ProductCard'
import './styles.css'

const FavoriteList = () => {
  const history = useHistory()

  const { favoriteList } = useCart()

  const takeProductId = (productId: string) => {
    history.push(`/products/${productId}`)
  }

    const onButtonClick = (productId: string) => {
      console.log(productId)
    }

  return(
    <div className='list'>
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
              key={p.productId}
              _id={p.productId}
              name={p.productName}
              variant={p.productVariant}
              image={p.image}
              price={p.price}
              takeProductId={takeProductId}
              onButtonClick={onButtonClick}
            />
          )
        })}
      </Grid>
    </div>
  )
}

export default FavoriteList