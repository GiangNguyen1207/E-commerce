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
  googleLogin,
  addProductToCart,
  getCart,
  removeProductInCart,
  increaseQuantity,
  decreaseQuantity,
  addToFavoriteList,
  getFavoriteList,
  removeProductInFavoriteList,
} from '../controllers/user'

const router = express.Router()

router.post('/signUp', createUser)
router.post('/signIn', signIn)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', validateToken)
router.put('/resetPassword', resetPassword)
router.put('/changePassword/:userId', changePassword)
router.post(
  '/google-authenticate',
  passport.authenticate('google-id-token'),
  googleLogin
)
router.post('/cart/:userId', addProductToCart)
router.get('/cart/:userId', getCart)
router.delete('/cart/:userId', removeProductInCart)
router.post('/favorite/:userId', addToFavoriteList)
router.delete('/favorite/:userId', removeProductInFavoriteList)
router.get('/favorite/:userId', getFavoriteList)
router.put('/cart/increase/:userId', increaseQuantity)
router.put('/cart/decrease/:userId', decreaseQuantity)
router.put('/:userId', updateUserProfile)

export default router
