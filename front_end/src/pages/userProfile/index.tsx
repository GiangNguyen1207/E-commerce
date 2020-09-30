import React, { useState } from 'react'
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
    btngroup: {
      width: '50%',
      margin: '60px auto',
      display: 'flex',
      justifyContent: 'space-around'
    },
    button: { 
      width: '10%',
      margin: '0 auto',
      marginTop: '60px'
    },
    hideButton: { 
      display: 'none'
    }
  })
)

const Profile = () => {
  const classes = useStyles();
  const { user } = useAuth()
  const [isEdit, setEdit] = useState(false)

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
          <div className={classes.names}>
            <TextField
              id="filled-read-only-firstName"
              label='First Name'
              defaultValue={user?.firstName}
              InputProps={!isEdit ? {readOnly: true}  : undefined}
              variant="filled"
              style={{width: '40%'}}
            />
            <TextField
              id="filled-read-only-lastName"
              label='Last Name'
              defaultValue={user?.lastName}
              InputProps={!isEdit ? {readOnly: true} : undefined}
              variant="filled"
              style={{width: '40%'}}
            />
          </div>
          <TextField
            id="filled-read-only-username"
            label='Username'
            defaultValue={user?.username}
            InputProps={!isEdit ? {readOnly: true} : undefined}
            variant="filled"
          />
          <TextField
            id="filled-read-only-email"
            label='Email'
            defaultValue={user?.email}
            InputProps={!isEdit ? {readOnly: true} : undefined}
            variant="filled"
            style={{marginTop: '40px'}}
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
                onClick={()=>setEdit(true)}
              >
                Save
              </Button>
              <Button
              variant="contained"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={()=>setEdit(false)}
              >
                Cancle
              </Button>
            </div>
          : null}
        </div>
      </Container>
  )
}

export default Profile