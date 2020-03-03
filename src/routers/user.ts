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

const router = express.Router()

router.post('/signup', createUser)
router.post('/', signIn)
router.put('/:userId', updateUserProfile)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', validateToken)
//router.put('/resetPassword', resetPassword)
router.put('/:userId/changePassword', changePassword)

export default router