import React from 'react'
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Link } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import DrawerComponent from '../Drawer'
import useAuth from 'pages/auth/hooks/useAuth'
import useCart from 'pages/cart/hooks/useCart'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${320}px)`,
      marginLeft: 320,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaper: {
      width: 320,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -320,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const AppBarComponent = () => {
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const open = Boolean(anchorEl)
  const { user } = useAuth()
  const { cart } = useCart()
  let quantity: Number | undefined = 0

  if(cart?.length) {
    quantity = cart.map(c => c.quantity).reduce((a,b) => a + b)
  }

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const goToSignIn = () => {
    history.push('/user/signIn')
  };

  const goToSignUp = () => {
    history.push('/user/signUp')
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const goToCart = () => {
    history.push('/cart')
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        color='transparent'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          {user ? (
          <IconButton
            edge="start"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon/>
          </IconButton>
          ) : null }
          <Typography variant="h4" className={classes.title}>
            <Link href="/" style={{textDecoration:'none', color:'black'}}>
              FOREO
            </Link>
          </Typography>
          <IconButton 
            onClick={user ? goToCart : goToSignIn}
            edge="end" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu">
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartIcon />
            </Badge> 
          </IconButton>
          {user ? (
            <Typography variant="subtitle2">
              {user.username}
            </Typography>
          ) : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={goToSignIn}>Sign In</MenuItem>
                  <MenuItem onClick={goToSignUp}>Sign Up</MenuItem>
                </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}> 
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <DrawerComponent/>
      </Drawer>
  </div>
  )
}

export default AppBarComponent