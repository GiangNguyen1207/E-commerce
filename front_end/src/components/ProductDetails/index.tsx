import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import image from '../../sources/jbt3.png'
import { useParams } from 'react-router';
import useProduct from '../../hooks/useProduct';


const ProductDetails = () => {
  const {productId} = useParams()
  const {details} = useProduct(productId)

  return(
    <>
      <img src={image} width='100%' alt='Luna 3'/>
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
            <img src={details.image} alt={details.name} style={{paddingLeft: '40%'}} width='45%'/>
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
              <Button variant="contained" size='large' style={{backgroundColor: '#e7accf', marginLeft: '65%'}}>
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