import React from 'react'
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import banner from 'assets/images/product_banner.png'
import useProduct from 'pages/productList/hooks/useProduct';
import useAuth from 'pages/auth/hooks/useAuth'
import { addProductToCart } from 'pages/cart/redux/actions'

const SingleProduct = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
  const { singleProduct } = useProduct(productId)
  const { user } = useAuth()

  const handleClick = () => {
    if(user && singleProduct) {
      dispatch(addProductToCart(user._id, singleProduct.name, singleProduct.variant, singleProduct._id, singleProduct.price))
    } else {
      history.push('/user/signIn')
    }
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
        style={{width: '90%', margin: '80px auto'}}
      > 
      {singleProduct ? (
        <>
          <Grid item xs={4}>
            <img src={singleProduct.image} alt={singleProduct.name} width='80%'/>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='h4' style={{marginBottom: '5%'}}>
              <b>{singleProduct.name}</b>
            </Typography>
            <Typography variant='subtitle1' style={{marginBottom: '5%', color: '#323232'}}>
              {singleProduct.shortDescription}
            </Typography>
            <Typography variant='body2' style={{marginBottom: '5%', color: '#808080'}}>
              {singleProduct.longDescription}
            </Typography>
              <hr style={{
                  width:'100%', 
                  color: '#000000',
                  backgroundColor: '#000000',
                  height: '.1',
                  borderColor : '#cccccc',
                  marginBottom: '5%'}} />
            <Typography variant='body2' style={{fontSize: '24px', display: 'flex', justifyContent: 'space-between'}}>
              <b>€ {singleProduct.price}</b>
              <Button 
                onClick={handleClick}
                variant="contained" 
                size='large' 
                style={{backgroundColor: '#e7accf'}}>
                <b>BUY</b>
              </Button>
            </Typography>
              <hr style={{
                width:'100%', 
                color: '#000000',
                backgroundColor: '#000000',
                height: '.1',
                borderColor : '#cccccc',
                marginTop: '5%'}} />
          </Grid>
        </> 
      ) : <div>Loading</div>
      }
      </Grid> 
     </>
  )
}

export default SingleProduct