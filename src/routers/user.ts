import express from 'express'

import {
  createUser,
  signIn,
  updateUserProfile,
  forgotPassword,
  validateToken,
  resetPassword,
} from '../controllers/user'

const router = express.Router()

router.post('/signup', createUser)
router.post('/', signIn)
router.put('/:userId', updateUserProfile)
router.post('/forgotPassword', forgotPassword)
router.get('/resetPassword', validateToken)
router.put('/resetPassword/', resetPassword)

export default router