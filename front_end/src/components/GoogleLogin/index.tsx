import React from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { googleSignin } from 'pages/auth/redux/actions'

const GoogleSignin= () => {
  const history = useHistory()
  const dispatch = useDispatch()
  async function ResponseGoogle (response: any) { 
    dispatch(googleSignin(response.tokenObj.id_token, history))
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