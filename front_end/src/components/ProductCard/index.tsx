import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useAuth from 'pages/auth/hooks/useAuth'
import { addProductToCart, addProductToFavoriteList } from 'pages/cart/redux/actions'

type Props = {
  _id: string
  name: string,
  image: string,
  variant: string,
  price: number,
  takeProductId: (_id: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 325,
      cursor: 'pointer'
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
      width: '46%',
      margin: '0 auto'
    },
  }),
);

const ProductCard = ({ _id, name, image, variant, price, takeProductId}: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { user } = useAuth()

  const addToFavorite = () => {
    if(user) {
      dispatch(addProductToFavoriteList(user?._id, _id))
    } else {
      history.push('/user/signIn')
    }
  }

  const addToCart = () => {
    if(user) {
      dispatch(addProductToCart(user?._id, name, variant, _id))
    } else {
      history.push('/user/signIn')
    }
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
          <div onClick={()=>takeProductId(_id)}>
            <CardHeader
              title={name}
            />
            <CardMedia
              className={classes.media}
              image={image} 
              title={name}
            />  
          </div>
          <CardContent>
            <Typography variant='h6'>
              <b style={{marginLeft:'40%', fontSize: '26px'}}>€ {price}</b>
            </Typography>
          </CardContent>
          <hr style={{
                  width:'100%', 
                  color: '#000000',
                  backgroundColor: '#000000',
                  height: '.5',
                  borderColor : '#cccccc',
                  marginBottom: '2%'}} />
          <CardActions>
            <IconButton 
              onClick={addToFavorite}
              aria-label="add to favorites"
              style={{marginLeft: '2%'}}>
                <FavoriteIcon />
            </IconButton>
            <IconButton 
              aria-label="add to cart" 
              style={{marginLeft: '65%'}} 
              onClick={addToCart}
              >
                <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid> 
    </>
  )
}

export default ProductCard