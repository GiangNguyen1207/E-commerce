import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

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

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await crypto.randomBytes(32).toString('hex')
    await UserService.forgotPassword(req.body.email, token) 
    const data = {
      to: req.body.email,
      from: 'giang.nguyen@integrify.io',
      template: 'reset-password-template',
      subject: 'Reset your password',
      text: 
      `Please click on the following link
      ${`http://localhost:3000/users/resetPassword?token=${token}`} 
      to reset your password. \n\n 
      If you did not request this, 
      please ignore this email and your password will remain unchanged.\n`,
    }

    const smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'nguyengiang.nchg@gmail.com',
        pass: "aaa",//Put this one in secrect!!!!!
      }
    });
    
    smtpTransport.sendMail(data, function(error) {
      if (error) {
        console.log(error)
      } else {
        res.status(200).send('Email sent successfully')
      }
    });
  } catch (error) {
    if(error.name = 'Invalid Email') {
      next (new NotFoundError('Email not found', error))
    }
      next(new InternalServerError('Internal server error', error))
  }
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await UserService.validateToken(req.query.token)
    res.status(200).send('Token is validated')
  } catch (error) {
    if(error.name === 'Invalid token' || 'Wrong token') {
      next(new BadRequestError('Invalid token', error))
  }
    next(new InternalServerError('Internal server error', error))
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {username, newPassword, retypePassword} = req.body
    await UserService.resetPassword(username, newPassword, retypePassword)
    res.json('Password has been reset successfully')
  } catch (error) {
    if(error.name === 'User not found' || 'Passwords do not match') {
      next(new BadRequestError('Bad request', error))
  }
    next(new InternalServerError('Internal server error', error))
  }
}

