import express from 'express'

import {
  createUser,
  signIn,
  updateUserProfile,
  forgotPassword,
  validateToken,
  resetPassword,
  changePassword
} from '../controllers/user'
import passport = require('passport');

const router = express.Router()

router.post('/signup', createUser)
router.post('/', signIn)
router.put('/:userId', updateUserProfile)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', validateToken)
//router.put('/resetPassword', resetPassword)
router.put('/:userId/changePassword', changePassword)
/*router.post('/google-authenticate', 
  passport.authenticate('google-id-token'),
  authenticate
)*/

export default router