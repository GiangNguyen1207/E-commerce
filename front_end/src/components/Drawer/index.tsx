import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { signout } from 'pages/auth/redux/actions'

const LeftDrawer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(signout())
    window.location.href = '/'
  }

  return(
    <>
      <Divider />
        <List>
          <ListItem onClick={() => history.push('/profile')} style={{cursor:'pointer'}}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'User profile'} />
          </ListItem>
          <ListItem style={{cursor:'pointer'}}>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary={'Change password'} />
          </ListItem>
          <ListItem onClick={() => history.push('/favorite')} style={{cursor:'pointer'}}>
            <ListItemIcon>
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