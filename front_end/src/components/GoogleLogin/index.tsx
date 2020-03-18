import React from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import { Redirect, useHistory } from 'react-router';

const GoogleSignin= () => {
  const history = useHistory()
  async function ResponseGoogle (response: any) { 
    const res = await axios.post('http://localhost:3000/api/v1/users/google-authenticate', {
      id_token: response.tokenObj.id_token
    })

    await localStorage.setItem('id_token', res.data.token)

    await localStorage.setItem('user', res.data.username)
  
    if(res.data) {
      history.push('/')
    }
  }

  return (
    <GoogleLogin
      clientId="827944169415-416idnak4qdkql3piho5q3a5a9ngb611.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={ResponseGoogle}
      onFailure={ResponseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleSignin