import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'pages/home'
import SearchProducts from 'pages/productList';
import ProductDetails from 'pages/productDetails'
import SignIn from 'pages/auth/components/login'
import SignUp from 'pages/auth/components/signup'
import ShoppingCart from 'pages/cart'
import FavoriteList from 'pages/favoriteList'
import Profile from 'pages/userProfile'

const Routes = () => (
  <Switch>
    <Route
      exact
      path='/'
      component={ Home }
    />

    <Route
      exact
      path='/products'
      component={ SearchProducts }
    />

    <Route
      exact
      path='/products/:productId'
      component={ ProductDetails }
    />  

    <Route
      exact
      path='/user/signIn'
      component={ SignIn }
    />

    <Route
      exact
      path='/user/signUp'
      component={ SignUp }
    />

    <Route
      exact
      path='/cart'
      component={ ShoppingCart }
    />

    <Route
      exact
      path='/favorite'
      component={ FavoriteList }
    />

    <Route
      exact
      path='/profile'
      component={ Profile }
    />
    
  </Switch>
)

export default Routes