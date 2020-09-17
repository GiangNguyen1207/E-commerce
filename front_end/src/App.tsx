import React from 'react'
import axios from 'axios'

import Routes from 'Routes'
import AppBar from 'components/AppBar'
import useAuth from 'pages/auth/hooks/useAuth'

export default function App() {
  const { token } = useAuth() 
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`
  return (
    <>
      <AppBar />
      <Routes />
    </>
  )
}