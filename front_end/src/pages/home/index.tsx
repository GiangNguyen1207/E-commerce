import React from 'react'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import img from 'assets/images/home_banner.jpg'
import img1 from 'assets/images/throne.png'

const Home = () => {
  const history = useHistory()

  return (
    <>
      <img src={img} alt='banner' width='100%'/>
      <div style={{width:'80%', margin: '40px auto', display: 'flex', justifyContent: 'center'}}>
        <Button
          onClick={()=>history.push('/products')}
          size='large'
          variant="contained"
          style={{backgroundColor: '#e7accf', color: '#000000'}}
          endIcon={<ArrowForwardIcon/>}
        >
          View all products
        </Button> 
      </div>
      <iframe width="1440" height="652" src="https://www.youtube.com/embed/eDW3fxqPjwY" style={{width: '50%', margin: '20px auto', display: 'block'}} title='Foreo video'/>
      <img src={img1} alt='banner' width='100%'/>
    </>
  )
}

export default Home;
