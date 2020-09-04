import bcrypt from 'bcrypt'

import User, { UserDocument } from '../models/User'

function createUser(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

function signIn(userInfo: string, password: string): Promise<UserDocument> {
  return User.findOne({ $or: [{ username: userInfo }, { email: userInfo }] })
    .exec()
    .then(async (user) => {
      if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          return user
        }
        throw new Error('Username/email or password incorrect')
      }
      throw new Error('Username/email or password incorrect')
    })
}

function updateUserProfile(
  userId: string,
  userUpdate: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      if (userUpdate.firstName) {
        user.firstName = userUpdate.firstName
      }
      if (userUpdate.lastName) {
        user.lastName = userUpdate.lastName
      }
      if (userUpdate.email) {
        user.email = userUpdate.email
      }
      return user.save()
    })
}

function forgotPassword(email: string, token: string): Promise<UserDocument> {
  return User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('Invalid Email')
      }
      if (user) {
        user.forgotPassword = {
          token: token,
          timeOfCreated: Date.now(),
          timeStamp: 300000,
        }
      }
      return user.save()
    })
}

function validateToken(query: any): Promise<UserDocument> {
  return User.findOne({ 'forgotPassword.token': query })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('Wrong token')
      }
      if (
        Date.now() >
        user.forgotPassword.timeOfCreated + user.forgotPassword.timeStamp
      )
        throw new Error('Invalid token')
      user.set('forgotPassword', null)
      return user.save()
    })
}

function resetPassword(
  userInfo: string,
  newPassword: string
): Promise<UserDocument> {
  return User.findOne({ $or: [{ username: userInfo }, { email: userInfo }] })
    .exec()
    .then((user) => {
      if (!user) throw new Error('User not found')
      user.password = newPassword
      return user.save()
    })
}

function changePassword(
  userId: string,
  oldPassword: string,
  newHashedPassword: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then(async (user) => {
      if (!user) {
        throw new Error('User not found')
      }
      const match = await bcrypt.compare(oldPassword, user.password)
      if (!match) {
        throw new Error('Passwords not match')
      }
      user.password = newHashedPassword
      return user.save()
    })
}

function addProductToCart(
  userId: string,
  productName: string,
  productVariant: string,
  productId: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User not found')
      }
      const existing = user.cart.find((i) => i.productId === productId)
      if (existing) {
        existing.quantity += 1
      } else {
        user.cart.push({ productName, productId, productVariant, quantity: 1 })
      }
      return user.save()
    })
}

function getCart(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User not found')
      }
      return user
    })
}

function removeProductInCart(
  userId: string,
  productId: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User not found')
      }
      const existing = user.cart.find((item) => item.productId === productId)

      if (existing) {
        const index = user.cart.indexOf(existing)
        user.cart.splice(index, 1)
      }
      if (!existing) {
        throw new Error('Product not match')
      }
      return user.save()
    })
}

function increaseQuantity(
  userId: string,
  productId: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User not found')
      }
      const existing = user.cart.find((item) => item.productId === productId)

      if (existing) {
        existing.quantity++
      }
      if (!existing) {
        throw new Error('Product not match')
      }
      return user.save()
    })
}

function decreaseQuantity(
  userId: string,
  productId: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User not found')
      }
      const existing = user.cart.find((item) => item.productId === productId)

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity--
        } else {
          const index = user.cart.indexOf(existing)
          user.cart.splice(index, 1)
        }
      }
      if (!existing) {
        throw new Error('Product not match')
      }
      return user.save()
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
  getCart,
  removeProductInCart,
  increaseQuantity,
  decreaseQuantity,
}
