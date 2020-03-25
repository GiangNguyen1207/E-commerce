import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import banner from '../../sources/jbt3.png'
// import useProduct from '../../hooks/useProduct';
import { Details, AppState } from '../../type'
import { useProductService } from '../../services/productService'
import { useUserService } from '../../services/userService'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const { productId }  = useParams()
  const { addToCart } = useUserService('', dispatch)

  const userId = localStorage.getItem('userId')

  const { fetchProductById } = useProductService(dispatch)

  useEffect(() => {
   fetchProductById(productId)
  },[])

  const details = useSelector((state: AppState) => state.product.singleProduct)

  const handleAdd = () => {
    const product: Details = {
      _id: productId || '',
      name: details.name,
      image: details.image,
      category: details.category,
      variant: details.variant,
      price: details.price,
    }
    addToCart(userId, product, productId)
  }

   return(
     <>
      <img src={banner} width='100%' alt='Luna 3'/>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        wrap='wrap'
      > 
      {details ? (
        <>
          <Grid item xs={6}>
            <img src={details.image} alt={details.name} style={{margin: '5% 0 0 40%'}} width='50%'/>
          </Grid>
          <Grid item xs={6} style={{paddingRight: '18%'}}>
            <Typography variant='h4' style={{marginBottom: '5%'}}>
              <b>{details.name}</b>
            </Typography>
            <Typography variant='subtitle1' style={{marginBottom: '5%', color: '#323232'}}>
              {details.shortDescription}
            </Typography>
            <Typography variant='body2' style={{marginBottom: '5%', color: '#808080'}}>
              {details.longDescription}
            </Typography>
              <hr style={{
                  width:'100%', 
                  color: '#000000',
                  backgroundColor: '#000000',
                  height: '.1',
                  borderColor : '#cccccc',
                  marginBottom: '5%'}} />
            <Typography variant='body2' style={{fontSize: '24px'}}>
              <b>€ {details.price}</b>
              <Button 
                onClick={handleAdd}
                variant="contained" 
                size='large' 
                style={{backgroundColor: '#e7accf', marginLeft: '65%'}}>
                <b>BUY</b>
              </Button>
            </Typography>
              <hr style={{
                width:'100%', 
                color: '#000000',
                backgroundColor: '#000000',
                height: '.5',
                borderColor : '#000000',
                marginTop: '5%'}} />
          </Grid>
        </> 
      ) : <div>Loading</div>
      }
      </Grid> 
     </>
  )
}

export default ProductDetails