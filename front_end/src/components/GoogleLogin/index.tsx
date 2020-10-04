import React from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { googleSignin } from 'pages/auth/redux/actions'

const GoogleSignin= () => {
  const clientID: any = process.env.REACT_APP_CLIENT_ID
  const history = useHistory()
  const dispatch = useDispatch()
  async function ResponseGoogle (response: any) { 
    dispatch(googleSignin(response.tokenObj.id_token, history))
  }
  
  return (
    <GoogleLogin
      clientId={clientID}
      buttonText="Login with Google"
      onSuccess={ResponseGoogle}
      onFailure={ResponseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleSignin