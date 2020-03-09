import User, { UserDocument } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets';

function createUser(user: UserDocument): Promise<UserDocument> {
  return user.save()
}   
 
function signIn(username: string, password: string): Promise<UserDocument> {
  return User.findOne({username: username})
    .exec()
    .then(async (user) => {
      if(user) {
        const match = await bcrypt.compare(password, user.password)
        if(match) {
          return user
        } throw new Error('Username or password incorrect')
      } 
        throw new Error('Usernam of password incorrect')
    })
}

function updateUserProfile(
  userUpdate: Partial<UserDocument>,
  userId: string
  ): Promise<UserDocument> {
    return User.findById(userId)
      .exec()
      .then(user => {
        if(!user) {
          throw new Error(`User ${userId} not found`)
        }
        if(userUpdate.firstName) {
          user.firstName = userUpdate.firstName
        } 
        if(userUpdate.lastName) {
          user.lastName = userUpdate.lastName
        }
        if(userUpdate.email) {
          user.email = userUpdate.email
        }
        return user.save()
      })
}

function forgotPassword(email: string, token: string): Promise<UserDocument> {
  return User.findOne({email: email})
    .exec()
    .then(user => {
      if(!user) {
        throw new Error('Invalid Email')
      }
      if(user) {
        user.forgotPassword = {
          token: token,
          timeOfCreated: Date.now(),
          timeStamp: 300000,
        }
      }
      return user.save()
    })
}

function validateToken(query: string): Promise<UserDocument> { 
  return User.findOne({'forgotPassword.token': query})
    .exec() 
    .then(user => {
      console.log(user)
      if(!user) {
        throw new Error('Wrong token')
      } if(Date.now() > (user.forgotPassword.timeOfCreated + user.forgotPassword.timeStamp))
        throw new Error('Invalid token')
     user.set('forgotPassword', null)
      return user.save()
    })
}

function resetPassword(
  username: string, 
  newPassword: string, 
  retypePassword: string
  ): Promise<UserDocument> {
    return User.findOne({username: username}) 
      .exec()
      .then(user => {
        if(!user)
          throw new Error('User not found')
        if(newPassword !== retypePassword) {
          throw new Error('Passwords do not match')
        }
        user.password = newPassword
        return user.save()
      })
  }

function changePassword(
  userId: string,
  oldPassword: string,
  newHashedPassword: string
  ): Promise<UserDocument> {
    return User.findById({userId}) 
      .exec()
      .then(async(user) => {
        if(!user) {
          throw new Error('User not found')
        }
        const match = await bcrypt.compare(oldPassword, user.password)
        if(!match) {
          throw new Error('Passwords not match')
        }
        user.password = newHashedPassword
        return user.save()
      })
}

function addProductToCart (
  userId: string,
  name: string,
  variant: string 
) : Promise<UserDocument> {
  return User.findById({userId})
    .exec()
    .then(user => {
      if(!user) {
        throw new Error('User not found')
      }
        user.cart.push({name, variant})
      return user.save()
    })
}

function getCart(userId: string): Promise<UserDocument> {
  return User.findById({userId})
    .exec()
    .then(user => {
      if(!user) {
        throw new Error('User not found')
      }
      return user
    })
}

export default {
  createUser,
  signIn,
  updateUserProfile,
  forgotPassword,
  validateToken,
  resetPassword,
  changePassword,
  addProductToCart,
  getCart
}
