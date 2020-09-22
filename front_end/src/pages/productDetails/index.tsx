import React from 'react'
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import lunaBanner from 'assets/images/luna_banner_1.png'
import issaBanner from 'assets/images/issa_banner_1.jpg'
import lunaBanner2 from 'assets/images/luna_banner_2.jpg'
import issaBanner2 from 'assets/images/issa_banner_2.jpg'
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
      {singleProduct?.name && singleProduct?.name.includes('Luna') ? 
        <img src={lunaBanner} width='100%' alt='banner'/>
        : 
        <img src={issaBanner} width='100%' alt='banner'/>
      }
      {singleProduct?.name ? (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          wrap='wrap'
          style={{width: '90%', margin: '80px auto'}}
        > 
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
                  marginBottom: '20px'}} />
            <Typography variant='body2' style={{fontSize: '24px', display: 'flex', justifyContent: 'space-between'}}>
              <b style={{color: '#e6427a'}}>€ {singleProduct.price}</b>
              <Button 
                onClick={handleClick}
                variant="contained" 
                size='large' 
                style={{backgroundColor: '#e7accf', width: '100px'}}>
                <b>BUY</b>
              </Button>
            </Typography>
              <hr style={{
                width:'100%', 
                color: '#000000',
                backgroundColor: '#000000',
                height: '.1',
                borderColor : '#cccccc',
                marginTop: '20px'}} />
          </Grid>
        </Grid> 
        ) : <div>Loading</div>
      }
      <img src={lunaBanner2} width='100%' alt='banner'/>
      <img src={issaBanner2} width='100%' alt='banner'/>
     </>
  )
}

export default SingleProduct