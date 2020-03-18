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
  authenticate,
  addProductToCart,
  getCart
} from '../controllers/user'


const router = express.Router()

router.post('/signUp', createUser)
router.post('/signIn', signIn)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', validateToken)
router.put('/resetPassword', resetPassword)
router.put('/changePassword/:userId', changePassword)
router.put('/:userId', updateUserProfile)
router.post('/google-authenticate', 
  passport.authenticate('google-id-token'),
  authenticate
)
router.post('/cart/:userId', addProductToCart)
router.get('/cart/:userId', getCart)

export default router