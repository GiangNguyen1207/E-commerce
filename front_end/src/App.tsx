import React from 'react'
import axios from 'axios'
import { Alert } from '@material-ui/lab';

import Routes from 'Routes'
import AppBar from 'components/AppBar'
import useAuth from 'pages/auth/hooks/useAuth'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/reducer';
import { hideNotification } from 'components/redux/actions'
import './app.css'

export default function App() {
  const dispatch = useDispatch()
  const { token } = useAuth() 
  const notification = useSelector((state: RootState) => state.notification)

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`

  if(notification !== null) {
    setTimeout(() => {
      dispatch(hideNotification())
    }, 2000)
  }

  return (
    <>
      <AppBar />
      <div className='alert'>
        {notification !== null && 
          <Alert variant="filled" severity={notification?.type} className='alert'>
            {notification?.message}
          </Alert>
        }
      </div>
      <div className='content'>
        <Routes />
      </div>
      
    </>
  )
}