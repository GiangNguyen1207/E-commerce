import express from 'express'

import {
  createUser,
  signIn,
  updateUserProfile,
  //forgotPassword
} from '../controllers/user'

const router = express.Router()

router.post('/signup', createUser)
router.post('/', signIn)
router.put('/:userId', updateUserProfile)
//router.post('/forgotPassword', forgotPassword)

export default router