import React from 'react'
import { useHistory } from 'react-router'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import img from '../../sources/jbt1.jpg'
import skincare from '../../sources/banner1.jpg'
import oralcare from '../../sources/banner2.jpg'
import men from '../../sources/banner3.jpg'

const CarouselComponent = () => {
  const history = useHistory()

  return(
    <>
      <img src={img} alt='banner' width='100%'/>
      <div style={{width:'80%', margin: '0 auto', marginTop: '2%'}}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <img src={skincare} alt='skincare' width='100%' height='430px'/>
          </Grid>
          <Grid item xs={4}>
            <img src={oralcare} alt='oralcare' width='100%' height='430px'/>
          </Grid>
          <Grid item xs={4}>
            <img src={men} alt='luna for men' width='100%' height='430px'/>
          </Grid>
        </Grid>
        <Button
          onClick={()=>history.push('/products')}
          size='large'
          variant="contained"
          style={{backgroundColor: '#e7accf', color: '#000000', margin: '2% 0 0 40%'}}
          endIcon={<ArrowForwardIcon/>}
        >
        View all products
      </Button> 
      </div>
    </>
  )
}

export default CarouselComponent