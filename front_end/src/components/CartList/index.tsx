import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';



type Props = {
  name: string,
  productId: string,
  quantity: number,
  increase: (productId: string) => void,
  decrease: (productId: string) => void,
  removeProduct: (productId: string) => void,
}

const CardList = ({ name, productId, quantity, increase, decrease, removeProduct }: Props) => {
  return (
    <>
      <Grid item xs={12} sm={12} style={{display: 'flex', alignItems: 'center'}}>
        <Grid xs={6} sm={6}>
          <Typography variant="h6">
            <b>{name}</b>
          </Typography>
        </Grid>
        <Grid xs={6} sm={6}>
          <IconButton onClick={()=>decrease(productId)}>
            <RemoveIcon />
          </IconButton>
            <span style={{fontSize: '18px'}}>{quantity}</span>
          <IconButton onClick={()=>increase(productId)}>
            <AddIcon />
          </IconButton>
        </Grid>
        <IconButton 
          onClick={()=>removeProduct(productId)} >
          <DeleteIcon style={{fontSize: 40, color:'#d671ad'}}/>
        </IconButton>
      </Grid>
      <hr style={{
        width:'100%', 
        color: '#000000',
        backgroundColor: '#000000',
        height: '.5',
        borderColor : '#cccccc'}} />
    </>
  )
}

export default CardList