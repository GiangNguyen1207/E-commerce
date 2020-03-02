import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import UserService from '../services/user'
import User from '../models/User';
import { BadRequestError, InternalServerError, NotFoundError } from '../helpers/apiError';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {firstName, lastName, username, email} = req.body
    const password = await bcrypt.hash(req.body.password, 10)

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    })

    await UserService.createUser(user)
    res.json(user)
  } catch (error) {
    if(error.name === 'ValidationError') {
      next(new BadRequestError(error.message, error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {username, password} = req.body

    await UserService.signIn(username, password)
    res.status(200).send('Log in successfully')
  } catch (error) {
    if(error.name = 'Username or password incorrect') {
      next (new NotFoundError('Username or password incorrect', error))
    } 
  }
}

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateUser = req.body
    console.log(updateUser)
    const userId = req.params.userId
    const updateUserProfile = await UserService.updateUserProfile(updateUser, userId)
    res.json(updateUserProfile)
  } catch (error) {
    next (new NotFoundError('User not found', error))
  }
}

 