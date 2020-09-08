import React from 'react'
import { useDispatch } from 'react-redux';
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

import { Product } from '../../type';
import { useUserService } from '../../services/userService'

type Props = {
  _id: string
  name: string,
  image: string,
  category: string,
  variant: string,
  shortDescription: string, 
  longDescription: string
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

const SingleProduct = ({ _id, name, image, category, variant, shortDescription, longDescription, price, takeProductId}: Props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { addToCart } = useUserService('', dispatch)

  const userId = localStorage.getItem('userId')

  const handleAdd = () => {
    const product: Product = {
      _id: _id,
      name: name,
      image: image,
      category: category,
      variant: variant,
      shortDescription: shortDescription,
      longDescription: longDescription,
      price: price,
    }
    addToCart(userId, product, _id)
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
              title={name.split('-')[0]}
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
            <IconButton aria-label="add to favorites" style={{marginLeft: '2%'}}>
              <FavoriteIcon />
            </IconButton>
            <IconButton 
              aria-label="add to cart" 
              style={{marginLeft: '65%'}} 
              onClick={handleAdd}>
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid> 
    </>
  )
}

export default SingleProduct