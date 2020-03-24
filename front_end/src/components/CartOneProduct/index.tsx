import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

type Props = {
  name: string,
  image: string
}

const OneProductInCart = ({ name, image }: Props) => {
  return (
    <>
      <Grid item xs={12} sm={5} >
        <img src={image} width='30%' alt={name} style={{margin: '5% 0 5% 50%'}}/>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="h6" style={{margin: '15% 0 5% 0'}}>
          <b>{name}</b>
        </Typography>
        <IconButton>
          <RemoveIcon />
        </IconButton>
          <span style={{fontSize: '18px'}}>2</span>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={2}>
        <IconButton style={{margin: '40% 0 5% 0'}} >
          <DeleteIcon style={{fontSize: 40, color:'#d671ad'}}/>
        </IconButton>
      </Grid>
      <hr style={{
        width:'100%', 
        color: '#000000',
        backgroundColor: '#000000',
        height: '.5',
        borderColor : '#cccccc',
        marginTop: '2%'}} />
    </>
  )
}

export default OneProductInCart