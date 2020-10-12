import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import GoogleSignIn from 'components/GoogleLogin'
import { signin } from 'pages/auth/redux/actions'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    panel: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '50%',
      textAlign: 'center',
      marginTop: theme.spacing(1),
    },
    vertical: {
      borderLeft: '1px solid #cccccc',
      height: '300px',
      position: 'absolute',
      left: '55%',
      top: '30%',
    },
    button: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    text: {
      marginBottom: '10px',
    },
  })
)

export default function SignIn() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState('')
  const [password, setPassword] = useState('')

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signin(userInfo, password, history))
  }

  const getUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(e.target.value)
  }

  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.panel}>
          <form className={classes.form} onSubmit={handleSignin}>
            <Typography variant="h6">Log in with username/email</Typography>
            <TextField
              onChange={getUserInfo}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username or Email"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              onChange={getPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/user/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <div className={classes.vertical}></div>
          <div className={classes.button}>
            <Typography variant="h6" className={classes.text}>
              Log in with Google
            </Typography>
            <GoogleSignIn />
          </div>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
