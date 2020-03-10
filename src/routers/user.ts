import express from 'express'
import passport from 'passport'

import {
  createUser,
  signIn,
  updateUserProfile,
  forgotPassword,
  validateToken,
  resetPassword,
  changePassword,
  authenticate
} from '../controllers/user'

import auth from '../middlewares/authenticate'

const router = express.Router()

router.post('/signup', createUser)
router.post('/', signIn)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', validateToken)
router.put('/resetPassword', resetPassword)
router.put('/changePassword/:userId', auth, changePassword)
router.put('/:userId',auth, updateUserProfile)
router.post('/google-authenticate', 
  passport.authenticate('google-id-token'),
  authenticate
)
//router.post('/cart/:userId', addProductToCart)

export default router