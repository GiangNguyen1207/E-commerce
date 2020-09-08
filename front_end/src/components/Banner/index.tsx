import React from 'react'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import img from 'assets/images/home_banner.jpg'

const Banner = () => {
  const history = useHistory()

  return(
    <>
      <img src={img} alt='banner' width='100%'/>
      <div style={{width:'80%', margin: '0 auto', marginTop: '2%'}}>
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

export default Banner