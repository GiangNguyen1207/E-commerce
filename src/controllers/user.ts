import { Request, Response, NextFunction, response } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

import UserService from '../services/user'
import User from '../models/User';
import { BadRequestError, InternalServerError, NotFoundError } from '../helpers/apiError';
import { JWT_SECRET } from '../util/secrets';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {firstName, lastName, username, email} = req.body
    const password = await bcrypt.hash(req.body.password, 10)
    const key = await crypto.randomBytes(32).toString('hex')

    const user = new User({
      firstName,
      lastName,
      username,
      key,
      email,
      password,
    })

    await UserService.createUser(user)
    res.json(user)
  } catch (error) {
    if(error.name === 'ValidationError') {
      next(new BadRequestError(error.message, error))
    } 
      next(new InternalServerError('Internal Server Error', error))
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {username, password} = req.body

    const user = await UserService.signIn(username, password)
    res.json(user)
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
        type: "OAuth2",
        user: 'nguyengiang.nchg@gmail.com',
        clientId: "827944169415-prtn9qqng1o1dqn18kb65jtfral9c7ta.apps.googleusercontent.com",
        clientSecret: "TAVY45kpNcpuQtbTVJIAf65f",
        refreshToken: "1//04EH5AztmTdRXCgYIARAAGAQSNwF-L9IrK-g9MecBpAXET7OKQDtZmnDopsMnfoKDgu37wyV2f06ianoFYrHAmXzdPgPFFA8s_EA"
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

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {oldPassword, newPassword} = req.body
    const newHashedPassword = await bcrypt.hash(newPassword, 10)
    const userId = req.params.userId
    const updatedPassword = await UserService.changePassword(
      userId, 
      oldPassword, 
      newHashedPassword
    )
    res.status(200).send('Password has been changed successfully')
  } catch (error) {
    if(error.name = 'User not found') {
      next(new NotFoundError('User not found', error))
    }
    if(error.name = 'Passwords not match') {
      next(new BadRequestError('Passwords not match', error))
    }
    next(new InternalServerError('Internal server error', error))
  }
}

export const authenticate = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    const {email, userId, username} = req.user as any
    const token = await jwt.sign(
      {
        email,
        userId,
        username
      }, 
      JWT_SECRET,
      {
        expiresIn: '1h'
      }
      )
    res.json({token, email, userId, username})
  } catch(error) {
    return next(new InternalServerError())
  }
}

export const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const {productId, variant} = req.body
    const cart = await UserService.addProductToCart(userId, productId, variant)
    res.json(cart)
  } catch(error) {
      if(error.name = 'User not found') {
        return next(new BadRequestError('User not found', error))
      }
      return next(new InternalServerError('Internal server error', error))
  }
}

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const cart = await UserService.getCart(userId)
    res.json(cart)
  } catch(error) {
    if(error.name = 'User not found') {
      return next(new BadRequestError('User not found', error))
    }
    return next(new InternalServerError('Internal server error', error))
  }
}

