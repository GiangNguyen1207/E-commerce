import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
      display: 'flex',
      flexDirection: 'column',
    },
    passwords: {
      marginTop: '40px'
    },
    label: {
      textTransform: 'capitalize'
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
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    showCurrentPassword: false,
    showNewPassword: false
  })

  const passwords = ['current password', 'new password']

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const onChangeCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, currentPassword: event.target.value})
  }

  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, newPassword: event.target.value })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(resetPassword(user?._id, values.currentPassword, values.newPassword))
    setValues({ ...values, currentPassword: '', newPassword: ''})
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
          {passwords.map(p => {
            return(
              <div className={classes.passwords}>
                <InputLabel htmlFor="passwords" className={classes.label}>{p}</InputLabel>
                <OutlinedInput
                  id="-passwords"
                  value={p === 'current password' ? values.currentPassword : values.newPassword}
                  style={{marginTop: '10px', width: '100%'}}
                  type={p === 'current password' ? 
                    values.showCurrentPassword ? 'text' : 'password' 
                    : values.showNewPassword ? 'text' : 'password'
                  }
                  onChange={p === 'current password' ? 
                    onChangeCurrentPassword :
                    onChangeNewPassword
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={p === 'current password' ? 
                          handleClickShowCurrentPassword 
                          : handleClickShowNewPassword
                        }>
                        {p === 'current password' ? 
                          values.showCurrentPassword ? <Visibility /> : <VisibilityOff />
                          : values.showNewPassword ? <Visibility /> : <VisibilityOff />
                        }
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            )
          })}
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