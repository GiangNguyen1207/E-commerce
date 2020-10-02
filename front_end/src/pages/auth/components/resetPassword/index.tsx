import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import useAuth from 'pages/auth/hooks/useAuth'
import { resetPassword } from 'pages/auth/redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
    },
    avatar: {
      margin: '10px auto',
      backgroundColor: '#d671ad'
    }, 
    title: {
      textAlign: 'center'
    },
    form: {
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      marginTop: '40px',
      margin: '0 auto',
      width: '30%'
    }
  })
)

const ResetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const onChangeOldPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value)
  }

  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(resetPassword(user?._id, oldPassword, newPassword))
  }

  return(
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Reset your password
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            onChange={onChangeOldPassword}
            id="filled-read-only-old-password"
            label='Current password'
            variant="outlined"
            />
          <TextField
            onChange={onChangeNewPassword}
            id="filled-read-only-new-password"
            label='New password'
            variant="outlined"
            style={{marginTop: '40px'}}
          />
          <Button
            type='submit'
            size='large'
            variant="contained"
            color="primary"
            startIcon={<LockOpenIcon />}
            className={classes.button}
          >
            Reset Password
          </Button>
        </form>
        </div>
    </Container>
  )
}

export default ResetPassword