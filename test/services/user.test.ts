import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../src/models/User'
import UserService from '../../src/services/user'
import * as dbHelper from '../db-helper'
import { JWT_SECRET } from '../../src/util/secrets';
import { error } from 'winston'

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
      userInfo: 'ABCD',
      password: '123456789'
    }
    const signedIn = await UserService.signIn(userSignIn.userInfo, userSignIn.password)
    expect(signedIn).toHaveProperty('username', 'ABCD')
    expect(signedIn).toHaveProperty('_id')
  })

  it('should sign in a user with email', async() => {
    await createUser()
    const userSignIn = {
      userInfo: 'abcd@gmail.com',
      password: '123456789'
    }
    const signedIn = await UserService.signIn(userSignIn.userInfo, userSignIn.password)
    expect(signedIn).toHaveProperty('username', 'ABCD')
    expect(signedIn).toHaveProperty('_id')
  })

  it('should not sign in a user with wrong username', async() => {
    expect.assertions(1)
    await createUser()
    const signIn = {
      userInfo: 'A',
      password: '123456789'
    }
    return UserService.signIn(signIn.userInfo, signIn.password)
      .catch(error => {
        expect(error.message).toMatch('Username/email or password incorrect')
      })
  })

  it('should not sign in a user with wrong email', async() => {
    expect.assertions(1)
    await createUser()
    const signIn = {
      userInfo: 'a@gmail.com',
      password: '123456789'
    }
    return UserService.signIn(signIn.userInfo, signIn.password)
      .catch(error => {
        expect(error.message).toMatch('Username/email or password incorrect')
      })
  })

  it('should not sign in a user with wrong password', async() => {
    expect.assertions(1)
    await createUser()
    const signIn = {
      userInfo: 'ABCD',
      password: '012345'
    }
    return UserService.signIn(signIn.userInfo, signIn.password)
      .catch(error => {
        expect(error.message).toMatch('Username/email or password incorrect')
      })
  })

  it('should update user profile', async() => {
    const user = await createUser()
    const update = {
      firstName: 'AB',
      lastName: 'CD',
      email: 'abcd123@gmail.com'
    }
    const updated = await UserService.updateUserProfile(user._id, update)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('firstName', 'AB')
    expect(updated).toHaveProperty('lastName', 'CD')
  })

  it('should not update non-existing user profile', async() => {
    expect.assertions(1)
    const update = {
      firstName: 'AB',
      lastName: 'CD',
    }
    return UserService.updateUserProfile(fakeUserId, update)
      .catch(error => {
        expect(error.message).toMatch(`User ${fakeUserId} not found`)
      })
  })

  it('should validate token', async() => {
    let user = new User({
      firstName: 'A',
      lastName: 'B',
      username: 'ABCD',
      email: 'abcd@gmail.com',
      password: '123456789',
      forgotPassword: {
        token: token,
        timeOfCreated: Date.now(),
        timeStamp: 3600000
      }
    })
    user.password = await bcrypt.hash(user.password, 10)
    await UserService.createUser(user)

    user = await UserService.validateToken(token)
    expect(JSON.stringify(user.forgotPassword)).toBe(JSON.stringify(null))
  })

  // it('should send token to email', async() => {
  //   let user = await createUser()
  //   const email = 'giang.nguyen@integrify.io'
  //   user = await UserService.forgotPassword(email, token) 
  //   expect(user.forgotPassword).toHaveProperty('token', token)
  //   expect(user.forgotPassword).toHaveProperty('timeOfCreated')
  //   expect(user.forgotPassword).toHaveProperty('timeStamp')
  // })

  it('should not return a token to a wrong email', async() => {
    expect.assertions(1)
    await createUser()
    const email = 'ab@gmail.com'
    return UserService.forgotPassword(email, token).catch(error => {
      expect(error.message).toMatch('Invalid Email')
    })
  })

  it('should not return fake token', async() => {
    expect.assertions(1)
    let user = await createUser()
    const email = 'abcd@gmail.com'
    user = await UserService.forgotPassword(email, token) 
    return UserService.validateToken(fakeToken).catch(error => {
      expect(error.message).toMatch('Wrong token')
    })
  })

  it('should invalidate token', async() => {
    let user = new User({
      firstName: 'A',
      lastName: 'B',
      username: 'ABCD',
      email: 'abcd@gmail.com',
      password: '123456789',
      forgotPassword: {
        token: token,
        timeOfCreated: Date.now() - 4000000,
        timeStamp: 3600000
      }
    })
    user.password = await bcrypt.hash(user.password, 10)
    await UserService.createUser(user)

    return UserService.validateToken(token).catch(error => {
      expect(error.message).toMatch('Invalid token')
    })
  })

  it('should reset password by username', async() => {
    await createUser()
    const userInfo = 'ABCD'
    const newPassword = '012345'
    const user = await UserService.resetPassword(
      userInfo,
      newPassword,
    )
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('password', newPassword)
  })

  it('should reset password by email', async() => {
    await createUser()
    const userInfo = 'abcd@gmail.com'
    const newPassword = '012345'
    const user = await UserService.resetPassword(
      userInfo,
      newPassword,
    )
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('password', newPassword)
  })

  it('should not reset password with wrong username', async() => {
    expect.assertions(1)
    await createUser()
    const userInfo = 'ab'
    const newPassword = '012345'
    return UserService.resetPassword(
      userInfo,
      newPassword,
    )
    .catch(error => {
      expect(error.message).toBe('User not found')
    })
  })

  it('should not reset password with wrong email', async() => {
    expect.assertions(1)
    await createUser()
    const userInfo = 'ab@gmail.com'
    const newPassword = '012345'
    return UserService.resetPassword(
      userInfo,
      newPassword,
    )
    .catch(error => {
      expect(error.message).toBe('User not found')
    })
  })

  it('should allow changing password', async() => {
    const user = await createUser()
    const change = {
      oldPassword: '123456789',
      newPassword: 'a1b2c3d4'
    }
    const hashedNewPasseord = await bcrypt.hash(change.newPassword, 10)
    const changedUser = await UserService.changePassword(
      user._id,
      change.oldPassword,
      hashedNewPasseord
    )
    expect(changedUser).toHaveProperty('_id')
    expect(changedUser).toHaveProperty('password', hashedNewPasseord)
  }) 

  it('should not allow changing password due to wrong old password', async() => {
    expect.assertions(1)
    const user = await createUser()
    const change = {
      oldPassword: '12345',
      newPassword: 'a1b2c3d4'
    }
    const hashedNewPasseord = await bcrypt.hash(change.newPassword, 10)
    return UserService.changePassword(
      user._id,
      change.oldPassword,
      hashedNewPasseord
    )
      .catch(error => {
        expect(error.message).toMatch('Passwords not match')
      })
  }) 

  it('should not allow changing password due to fake user', async() => {
    expect.assertions(1)
    const change = {
      oldPassword: '123456789',
      newPassword: 'a1b2c3d4'
    }
    return UserService.changePassword(
      fakeUserId, 
      change.oldPassword, 
      change.newPassword
    ).catch(error => {
      expect(error.message).toMatch('User not found')
    })
  })

  it('should add product to cart', async() => {
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }
    const cart = await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
      )
    expect(cart.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({'productName': 'Luna 2'})
      ])
    )
    expect(cart.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({'productVariant': 'Pearl Pink'})
      ])
    )
  })

  it('should increase quantity when adding existing product to cart', async() => {
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    let cart = await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    cart = await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    expect(cart.cart.length).toBe(1)
    expect(cart.cart[0].quantity).toBe(2)
    expect(cart.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({'productName': 'Luna 2'})
      ])
    )
    expect(cart.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({'productVariant': 'Pearl Pink'})
      ])
    )
  })

  it('should not add product to cart', async() => {
    await createUser()
    expect.assertions(1)
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }
    return UserService.addProductToCart(
      fakeUserId, 
      product.name,
      product.variant,
      product.id
    ).catch(error => {
      expect(error.message).toMatch('User not found')
    })
  })

  it('should get cart', async() => {
    const user = await createUser()
    const product1 = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product1.name,
      product1.variant,
      product1.id
    )

    const product2 = {
      id: '5e57b77b5795fa0b461c5573',
      name: 'Luna 3',
      variant: 'Aquamarine'
    }
    
    await UserService.addProductToCart(
      user._id, 
      product2.name,
      product2.variant,
      product2.id
    )

    const cart = await UserService.getCart(user._id)
    expect(cart.cart.length).toBe(2)
    expect(cart.cart[0].productName).toBe('Luna 2')
  })

  it('should not get cart', async() => {
    await createUser()
    expect.assertions(1)
    return UserService.getCart(fakeUserId).catch(error => {
      expect(error.message).toMatch('User not found')
    })
  })

  it('remove a product from cart', async() => {
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    const product1 = {
      id: '5e57b77b5795fa0b461c5573',
      name: 'Luna 3',
      variant: 'Aquamarine'
    }
    
    await UserService.addProductToCart(
      user._id, 
      product1.name,
      product1.variant,
      product1.id
    )

    const cart = await UserService.removeProductInCart(user._id, product1.id)
    expect(cart.cart.length).toBe(1)
    expect(cart.cart[0].productName).toBe('Luna 2')
  })

  it('should not remove a product from cart with wrong productId', async() => {
    expect.assertions(1)
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    const product1 = {
      id: '5e57b77b5795fa0b461c5573',
      name: 'Luna 3',
      variant: 'Aquamarine'
    }
    
    await UserService.addProductToCart(
      user._id, 
      product1.name,
      product1.variant,
      product1.id
    )

    return UserService.removeProductInCart(user._id, '5e57b5b5795fa0b461c5573')
      .catch(error => {
        expect(error.message).toMatch('Product not match')
    })
  })

  it('should not remove a product from cart with wrong userId', async() => {
    expect.assertions(1)
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    const product1 = {
      id: '5e57b77b5795fa0b461c5573',
      name: 'Luna 3',
      variant: 'Aquamarine'
    }
    
    await UserService.addProductToCart(
      user._id, 
      product1.name,
      product1.variant,
      product1.id
    )

    return UserService.removeProductInCart(fakeUserId, product1.id)
      .catch(error => {
        expect(error.message).toMatch('User not found')
    })
  })

  it('should increase quantity', async() => {
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    const cart = await UserService.increaseQuantity(user._id, product.id)
    expect(cart.cart.length).toBe(1)
    expect(cart.cart[0].productName).toBe('Luna 2')
    expect(cart.cart[0].quantity).toBe(2)
  })

  it('should not increase quantity with wrong productId', async() => {
    expect.assertions(1)
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    return await UserService.increaseQuantity(user._id, '5e57b87b5745fa0b461c5573')
      .catch(error => {
        expect(error.message).toMatch('Product not match')
      })
  })

  it('should not increase quantity with wrong userId', async() => {
    expect.assertions(1)
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    return await UserService.increaseQuantity(fakeUserId, product.id)
      .catch(error => {
        expect(error.message).toMatch('User not found')
      })
  })

  it('should decrease quantity - case quantity > 1', async() => {
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )
    
    let cart = await UserService.increaseQuantity(user._id, product.id)
    cart = await UserService.decreaseQuantity(user._id, product.id)
    expect(cart.cart.length).toBe(1)
    expect(cart.cart[0].productName).toBe('Luna 2')
    expect(cart.cart[0].quantity).toBe(1)
  })

  it('should decrease quantity case quantity = 1', async() => {
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )
    
    const cart = await UserService.decreaseQuantity(user._id, product.id)
    expect(cart.cart.length).toBe(0)
  })

  it('should not decrease quantity with wrong productId', async() => {
    expect.assertions(1)
    const user = await createUser()

    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    return await UserService.decreaseQuantity(user._id, '5e57b87b5745fa0b461c5573')
      .catch(error => {
        expect(error.message).toMatch('Product not match')
      })
  })

  it('should not decrease quantity with wrong userId', async() => {
    expect.assertions(1)
    const user = await createUser()
    const product = {
      id: '5e57b77b5745fa0b461c5573',
      name: 'Luna 2',
      variant: 'Pearl Pink',
    }

    await UserService.addProductToCart(
      user._id, 
      product.name,
      product.variant,
      product.id
    )

    return await UserService.decreaseQuantity(fakeUserId, product.id)
      .catch(error => {
        expect(error.message).toMatch('User not found')
      })
  })
})