import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { resetPassword } from 'pages/auth/redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      marginTop: '20px',
    },
    formControl: {
      width: '100%',
      margin: '10px auto 20px',
    },
  })
)

const ResetPassword = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    userInfo: '',
    newPassword: '',
    showPassword: false,
  })

  const onChangeUserInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, userInfo: event.target.value })
  }

  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, newPassword: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(resetPassword(values.userInfo, values.newPassword))
    setValues({ ...values, userInfo: '', newPassword: '' })
  }

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            onChange={onChangeUserInfo}
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-adornment-password">
              New password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.newPassword}
              onChange={onChangeNewPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={110}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Reset
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ResetPassword
