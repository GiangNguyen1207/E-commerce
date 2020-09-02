import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../src/models/User'
import UserService from '../../src/services/user'
import * as dbHelper from '../db-helper'
import { JWT_SECRET } from '../../src/util/secrets';

const fakeUserId = '5e57b77b5744fa0b461c7906'
const token = '5e57b77b5744fa0b461c7906'
const fakeToken = '5e57b77b5744fa0b461c7906234'

async function createUser() {
  let user = new User({
    firstName: 'A',
    lastName: 'B',
    username: 'ABCD',
    email: 'abcd@gmail.com',
    password: '123456789'
  })
  user.password = await bcrypt.hash(user.password, 10)
  return await UserService.createUser(user)
}

describe('user service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('firstName', 'A')
    expect(user).toHaveProperty('username', 'ABCD')
  })

  it('should sign in a user with username', async() => {
    await createUser()
    const userSignIn = {
      username: 'ABCD',
      password: '123456789'
    }
    const signedIn = await UserService.signIn(userSignIn.username, userSignIn.password)
    expect(signedIn).toHaveProperty('username', 'ABCD')
    expect(signedIn).toHaveProperty('_id')
  })

  it('should sign in a user with email', async() => {
    await createUser()
    const userSignIn = {
      email: 'abcd@gmail.com',
      password: '123456789'
    }
    const signedIn = await UserService.signIn(userSignIn.email, userSignIn.password)
    expect(signedIn).toHaveProperty('username', 'ABCD')
    expect(signedIn).toHaveProperty('_id')
  })

  // it('should not sign in a user', async() => {
  //   expect.assertions(1)
  //   await createUser()
  //   const signIn = {
  //     username: 'gigixinhdep',
  //     password: 'gigi12'
  //   }
  //   return UserService.signIn(signIn.username, signIn.password)
  //     .catch(error => {
  //       expect(error.message).toMatch('Username or password incorrect')
  //     })
  // })

  // it('should not sign in a user', async() => {
  //   expect.assertions(1)
  //   await createUser()
  //   const signIn = {
  //     username: 'gigixinhgai',
  //     password: 'gigi12'
  //   }
  //   return UserService.signIn(signIn.username, signIn.password)
  //     .catch(error => {
  //       expect(error.message).toMatch('Username or password incorrect')
  //     })
  // })

  // it('should update user profile', async() => {
  //   const user = await createUser()
  //   const update = {
  //     firstName: 'chipchip',
  //     lastName: 'xinhdep',
  //     email: 'giang.nguyen@gmail.com'
  //   }
  //   const updated = await UserService.updateUserProfile(user._id, update)
  //   expect(updated).toHaveProperty('_id', user._id)
  //   expect(updated).toHaveProperty('firstName', 'chipchip')
  //   expect(updated).toHaveProperty('lastName', 'xinhdep')
  // })

  // it('should not update non-existing user profile', async() => {
  //   expect.assertions(1)
  //   const update = {
  //     firstName: 'chipchip',
  //     lastName: 'xinhdep',
  //   }
  //   return UserService.updateUserProfile(fakeUserId, update)
  //     .catch(error => {
  //       expect(error.message).toMatch(`User ${fakeUserId} not found`)
  //     })
  // })

  // it('should send token to email', async() => {
  //   let user = await createUser()
  //   const email = 'giang.nguyen@integrify.io'
  //   user = await UserService.forgotPassword(email, token) 
  //   expect(user.forgotPassword).toHaveProperty('token', token)
  //   expect(user.forgotPassword).toHaveProperty('timeOfCreated')
  //   expect(user.forgotPassword).toHaveProperty('timeStamp')
  // })

  // it('should return a wrong email', async() => {
  //   expect.assertions(1)
  //   await createUser()
  //   const email = 'giang.nguyen@gmail.com'
  //   return UserService.forgotPassword(email, token).catch(error => {
  //     expect(error.message).toMatch('Invalid Email')
  //   })
  // })

  // it('should not validate token', async() => {
  //   expect.assertions(1)
  //   let user = await createUser()
  //   const email = 'giang.nguyen@integrify.io'
  //   user = await UserService.forgotPassword(email, token) 
  //   return UserService.validateToken(fakeToken).catch(error => {
  //     expect(error.message).toMatch('Wrong token')
  //   })
  // })

  // it('should reset password', async() => {
  //   await createUser()
  //   const username = 'gigixinhdep'
  //   const newPassword = 'gigixinhdep12'
  //   const user = await UserService.resetPassword(
  //     username,
  //     newPassword,
  //   )
  //   expect(user).toHaveProperty('_id')
  //   expect(user).toHaveProperty('password', newPassword)
  // })

  // it('should not allow reseting password', async() => {
  //   expect.assertions(1)
  //   await createUser()
  //   const username = 'gigixinhgai'
  //   const newPassword = 'gigixinhdep12'
  //   return UserService.resetPassword(
  //     username,
  //     newPassword,
  //   )
  //   .catch(error => {
  //     expect(error.message).toBe('User not found')
  //   })
  // })

  // it('should allow changing password', async() => {
  //   const user = await createUser()
  //   const change = {
  //     oldPassword: 'gigi12345',
  //     newPassword: 'gigixinhdep12'
  //   }
  //   const hashedNewPasseord = await bcrypt.hash(change.newPassword, 10)
  //   const changedUser = await UserService.changePassword(
  //     user._id,
  //     change.oldPassword,
  //     hashedNewPasseord
  //   )
  //   expect(changedUser).toHaveProperty('_id')
  //   expect(changedUser).toHaveProperty('password', hashedNewPasseord)
  // }) 

  // it('should not allow changing password', async() => {
  //   expect.assertions(1)
  //   const user = await createUser()
  //   const change = {
  //     oldPassword: 'giangxinhdep',
  //     newPassword: 'gigixinhdep12'
  //   }
  //   const hashedNewPasseord = await bcrypt.hash(change.newPassword, 10)
  //   return UserService.changePassword(
  //     user._id,
  //     change.oldPassword,
  //     hashedNewPasseord
  //   )
  //     .catch(error => {
  //       expect(error.message).toMatch('Passwords not match')
  //     })
  // }) 

  // it('should not allow changing password', async() => {
  //   expect.assertions(1)
  //   const change = {
  //     oldPassword: 'giangxinhdep',
  //     newPassword: 'gigixinhdep12'
  //   }
  //   return UserService.changePassword(
  //     fakeUserId, 
  //     change.oldPassword, 
  //     change.newPassword
  //   ).catch(error => {
  //     expect(error.message).toMatch('User not found')
  //   })
  // })

  // it('should add product to cart', async() => {
  //   const user = await createUser()
  //   const product = {
  //     name: 'Luna 2',
  //     variant: 'pearl pink'
  //   }
  //   const add = await UserService.addProductToCart(
  //     user._id, 
  //     product,
  //     product.variant
  //     )
  //   expect(add.cart).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({'name': 'Luna 2'})
  //     ])
  //   )
  //   expect(add.cart).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({'variant': 'pearl pink'})
  //     ])
  //   )
  // })

  // it('should not add product to cart', async() => {
  //   expect.assertions(1)
  //   const product = {
  //     name: 'Luna 2',
  //     variant: 'pearl pink'
  //   }
  //   return UserService.addProductToCart(
  //     fakeUserId, 
  //     product,
  //     product.variant
  //   ).catch(error => {
  //     expect(error.message).toMatch('User not found')
  //   })
  // })

  // it('should get cart', async() => {
  //   const user = await createUser()
  //   const product1 = {
  //     name: 'Luna 2',
  //     variant: 'pearl pink'
  //   }
  //   const product2 = {
  //     name: 'Luna 3',
  //     variant: 'aqua'
  //   }
  //   await UserService.addProductToCart(
  //     user._id, 
  //     product1,
  //     product1.variant
  //   )
  //   await UserService.addProductToCart(
  //     user._id, 
  //     product2,
  //     product2.variant
  //   )
  //   const productOfUser = await UserService.getCart(user._id)
  //   expect(productOfUser.cart.length).toBe(2)
  //   expect(productOfUser.cart[0].product).toBe('Luna 2')
  // })

  // it('should not get cart', async() => {
  //   expect.assertions(1)
  //   return UserService.getCart(fakeUserId).catch(error => {
  //     expect(error.message).toMatch('User not found')
  //   })
  // })

})