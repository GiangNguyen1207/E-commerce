import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import SearchProducts from './pages/searchProducts';
import ProductDetails from './pages/productDetails'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import ShoppingCart from './pages/shoppingCart'

const Routes = () => (
  <Switch>
    <Route
      exact
      path='/'
      component={ Home }
    />

    <Route
      exact
      path='/products/'
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
    
  </Switch>
)

export default Routes