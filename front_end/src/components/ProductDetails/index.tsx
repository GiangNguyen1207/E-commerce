import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import banner from '../../sources/jbt3.png'
import { useParams } from 'react-router';
import useProduct from '../../hooks/useProduct';
import { Product } from '../../type'
import { addProductToCart } from '../../redux/actions/cart'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const {productId} = useParams()
  console.log(productId)
  const {details} : any = useProduct(productId)

  const userId = localStorage.getItem('userId')

  const token = localStorage.getItem('id_token')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const addToCart = async() => {
    const res = await axios.post(`http://localhost:3000/api/v1/users/cart/${userId}`, 
    {
      userId: userId,
      name: details.name,
      productId: productId
    },
    config,
    )
  }

  const handleAdd = () => {
    const product: Product = {
      _id: productId || '',
      name: details.name,
      image: details.image,
      category: details.category,
      variant: details.variant,
      price: details.price,
    }
    dispatch(addProductToCart(product))
    addToCart()
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