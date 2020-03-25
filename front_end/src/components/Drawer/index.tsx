import React from 'react'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const LeftDrawer = () => {
  
  const logout = () => {
    localStorage.clear()
    window.location.href = '/';
  }

  return(
    <>
      <Divider />
        <List>
          <ListItem >
            <ListItemIcon style={{cursor:'pointer'}}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'User profile'} />
          </ListItem>
          <ListItem >
            <ListItemIcon style={{cursor:'pointer'}}>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary={'Change password'} />
          </ListItem>
          <ListItem >
            <ListItemIcon style={{cursor:'pointer'}}>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary={'Favourite List'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem onClick={logout} style={{cursor:'pointer'}}>
            <ListItemIcon >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
    </>
  )
}

export default LeftDrawer