import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import useAuth from 'pages/auth/hooks/useAuth'
import { updateProfile } from 'pages/auth/redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
    },
    names: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '40px 0'
    },
    avatar: {
      margin: '10px auto',
      backgroundColor: '#d671ad'
    }, 
    title: {
      textAlign: 'center'
    },
    form: {
      textAlign: 'center'
    },
    btngroup: {
      width: '50%',
      margin: '60px auto',
      display: 'flex',
      justifyContent: 'space-around'
    },
    button: { 
      width: '10%',
      marginTop: '60px',
    },
    hideButton: { 
      display: 'none'
    }
  })
)

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [isEdit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const onChangeFName= (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const onChangeLName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const update = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email
  }

  const onUpdateClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(updateProfile(user?._id, update))
    setEdit(false)
  }

  const onCancelClick = () => {
    setEdit(false)
    window.location.reload()
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            User Profile
          </Typography>
          <form className={classes.form} onSubmit={onUpdateClick}>
            <div className={classes.names}>
              <TextField
                onChange={onChangeFName}
                id="filled-read-only-firstName"
                label='First Name'
                defaultValue={user?.firstName}
                InputProps={!isEdit ? {readOnly: true}  : undefined}
                variant="filled"
                style={{width: '40%'}}
              />
              <TextField
                onChange={onChangeLName}
                id="filled-read-only-lastName"
                label='Last Name'
                defaultValue={user?.lastName}
                InputProps={!isEdit ? {readOnly: true} : undefined}
                variant="filled"
                style={{width: '40%'}}
              />
            </div>
            <TextField
              onChange={onChangeUsername}
              id="filled-read-only-username"
              label='Username'
              defaultValue={user?.username}
              InputProps={!isEdit ? {readOnly: true} : undefined}
              variant="filled"
              style={{width: '100%'}}
            />
            <TextField
              onChange={onChangeEmail}
              id="filled-read-only-email"
              label='Email'
              defaultValue={user?.email}
              InputProps={!isEdit ? {readOnly: true} : undefined}
              variant="filled"
              style={{marginTop: '40px', width: '100%'}}
            />
            <Button
              variant="contained"
              color="primary"
              className={!isEdit ? classes.button : classes.hideButton}
              startIcon={<EditIcon />}
              onClick={()=>setEdit(true)}
            >
              Edit
            </Button>
            {isEdit ? 
              <div className={classes.btngroup}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  type='submit'
                >
                  Save
                </Button>
                <Button
                variant="contained"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={onCancelClick}
                >
                  Cancle
                </Button>
              </div>
            : null}
          </form>
        </div>
  </Container>
  )
}

export default Profile