import React from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Product } from '../../type';
import OneProductInCart from '../CartOneProduct'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#d671ad'
    },
    button: {
      margin: theme.spacing(1),
    }
  })
)

const ShoppingCart = () => {
  const classes = useStyles()

  const local = localStorage.getItem('cart')
  const productsInCart: Product[] = JSON.parse(local || '')
  
  return(
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShoppingBasketIcon/>
          </Avatar>
          <Typography component="h1" variant="h4">
            Cart
          </Typography>
          <hr style={{
            width:'100%', 
              color: '#000000',
              backgroundColor: '#000000',
              height: '.5',
              borderColor : '#cccccc',
              marginTop: '2%'}} />
          <Grid container spacing={2}> 
            {productsInCart.map(p => {
              return (
                <OneProductInCart 
                  key={p._id}
                  name={p.name}
                  image={p.image}
                />
              )
            })}
          </Grid>
          <Grid container spacing={2} style={{marginTop: '2%'}}>
            <Grid item xs={12} sm={6} style={{textAlign:'start'}}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                startIcon={<ArrowBackIcon />}
              >
              Go back
              </Button>
            </Grid> 
            <Grid item xs={12} sm={6} style={{textAlign:'end'}}>
              <Button
                variant="outlined"
                color='secondary'
                className={classes.button}
                startIcon={<ArrowForwardIcon />}
              >
              Check out
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default ShoppingCart

{/**/}