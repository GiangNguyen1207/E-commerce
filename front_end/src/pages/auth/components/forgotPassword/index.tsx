import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { forgotPassword } from 'pages/auth/redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40px',
      textAlign: 'center',
    },
    form: {
      width: '70%',
      marginTop: '20px',
      textAlign: 'center',
    },
    submit: {
      width: '20%',
    },
  })
)

const ForgotPassword = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <Typography variant="h6">
        We will send a recovery link to your email. Please check and use it to
        reset your password.
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={onButtonClick}
      >
        <TextField
          onChange={onEmailChange}
          id="Email-input"
          label="Your email"
          variant="outlined"
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default ForgotPassword
