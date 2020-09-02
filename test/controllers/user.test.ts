import {Request, Response, NextFunction} from 'express'
import request from 'supertest'

import { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const userFakeId = '5e57b77b5744fa0b461c7906'

jest.mock(
  '../../src/middlewares/authenticate',
  () => (req: Request, res: Response, next: NextFunction) => next()
)

async function createUser(override?: Partial<UserDocument>) {
  let user = {
    firstName: 'A',
    lastName: 'B',
    username: 'ABCD',
    email: 'abcd@gmail.com',
    password: '123456789'
  }
  
  if(override) {
    user = {...user, ...override}
  }

  return await request(app)
    .post('/api/v1/users/signUp')
    .send(user)
}

describe('user controller', () => {
  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a user', async() => {
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })

  it('should not create a user with same username', async() => {
    await createUser()
    const newUser = {
      firstName: 'A',
      lastName: 'B',
      username: 'ABCD',
      email: 'abdc@gmail.com',
      password: '123456789'
    }
    const res = await request(app)
      .post('/api/v1/users/signUp')
      .send(newUser)
    expect(res.status).toBe(400)
  })

  it('should not create a user with same email', async() => {
    await createUser()
    const newUser = {
      firstName: 'A',
      lastName: 'B',
      username: 'ABDC',
      email: 'abcd@gmail.com',
      password: '123456789'
    }
    const res = await request(app)
      .post('/api/v1/users/signUp')
      .send(newUser)
    expect(res.status).toBe(400)
  })

  it('should not create a user with mising required data', async() => {
    const newUser = {
      email: 'abcd@gmail.com',
      password: '123456789'
    }
    const res = await request(app)
      .post('/api/v1/users/signUp')
      .send(newUser)
    expect(res.status).toBe(400)
  })


  it('should sign in a user with username', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const user = {
      userInfo: 'ABCD',
      password: '123456789'
    }
    
    res = await request(app)
      .post('/api/v1/users/signIn')
      .send(user)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user).toHaveProperty('username', 'ABCD')
  })

  it('should sign in a user with email', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const user = {
      userInfo: 'abcd@gmail.com',
      password: '123456789'
    }
    
    res = await request(app)
      .post('/api/v1/users/signIn')
      .send(user)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user).toHaveProperty('username', 'ABCD')
  })

  it('should not sign in a user with wrong password', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const user = {
      username: 'ABCD',
      password: '012345'
    }

    let res1 = await request(app)
      .post('/api/v1/users/signIn')
      .send(user)
    expect(res1.status).toBe(404)
  })

  it('should not sign in a user with wrong username', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const user = {
      username: 'A',
      password: '123456789'
    }

    let res1 = await request(app)
      .post('/api/v1/users/signIn')
      .send(user)
    expect(res1.status).toBe(404)
  })

  it('should update user profile', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const update = {
      firstName: 'X',
      lastName: 'Y',
      email: 'xyz@gmail.com'
    }

    res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send(update)

    expect(res.status).toBe(200)
    expect(res.body.email).toBe('xyz@gmail.com')
  })

  it('should not update user profile', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const update = {
      firstName: 'X',
      lastName: 'Y',
      email: 'xyz@gmail.com'
    }

    res = await request(app)
      .put(`/api/v1/users/${userFakeId}`)
      .send(update)

    expect(res.status).toBe(404)
  })

  // it('should send the email', async() => {
  //   let res = await createUser()
  //   expect(res.status).toBe(200)

  //   res = await request(app)
  //     .post(`/api/v1/users/forgotPassword`)
  //     .send({email: 'abcd@gmail.com'})

  //   expect(res.status).toBe(200)
  //   expect(res.body).toHaveProperty('message', 'Email sent successfully')
  // })

  it('should not send the email', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    res = await request(app)
      .post(`/api/v1/users/forgotPassword`)
      .send({email: 'ab@gmail.com'})

    expect(res.status).toBe(404)
  })

  it('should allow changing password', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const oldPassword = '123456789'
    const newPassword = '012345'

    const userId = res.body.user._id

    res = await request(app)
      .put(`/api/v1/users/changePassword/${userId}`)
      .send({userId, oldPassword, newPassword})

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message', 'Password has been changed successfully')
  })

  it('should not allow changing password', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const oldPassword = '123456789'
    const newPassword = '012345'

    res = await request(app)
      .put(`/api/v1/users/changePassword/${userFakeId}`)
      .send({userFakeId, oldPassword, newPassword})
    expect(res.status).toBe(404)
  })

  it('should not allow changing password when filling in wrong current password', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const oldPassword = '12345xxxx'
    const newPassword = '012345'

    const userId = res.body.user._id

    res = await request(app)
      .put(`/api/v1/users/changePassword/${userId}`)
      .send({userId, oldPassword, newPassword})
    expect(res.status).toBe(404)
  })

  it('should add product to cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id
    const productName = 'Luna 2'
    const productId = '5e57b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})

    expect(res.status).toBe(200)
    expect(res.body.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          'productName': 'Luna 2',
          'productVariant': 'Pearl Pink'
        })
      ])
    )
  })

  it('should not add product to cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const product = 'Luna 3'
    const variant = 'Aquamarine'

    res = await request(app)
      .post(`/api/v1/users/cart/${userFakeId}`)
      .send({userFakeId, product, variant})
    expect(res.status).toBe(404)
  })

  it('should get cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = 'e67b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    const productName1 = 'Luna 3'
    const productId1 = 'e77b88b5744fa0b461c5573'
    const productVariant1 = 'Mint'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName1, productId1, productVariant1})

    const respone = await request(app)
      .get(`/api/v1/users/cart/${userId}`)

    expect(respone.status).toBe(200)
    expect(respone.body.cart.length).toBe(2)
  })

  it('should not get cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = 'e67b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    const productName1 = 'Luna 3'
    const productId1 = 'e77b88b5744fa0b461c5573'
    const productVariant1 = 'Mint'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName1, productId1, productVariant1})

    const response = await request(app)
      .get(`/api/v1/users/cart/${userFakeId}`)

    expect(response.status).toBe(404)
  })

  it('should remove a product from cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = '5e57b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})
    expect(res.status).toBe(200)

    res = await request(app)
      .delete(`/api/v1/users/cart/${userId}`)
      .send({userId, productId})

    expect(res.status).toBe(200)
    expect(res.body.cart.length).toBe(0)
  })

  it('should not remove a product from cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = '5e57b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})
    expect(res.status).toBe(200)

    res = await request(app)
      .delete(`/api/v1/users/cart/${userFakeId}`)
      .send({userFakeId, productId})

    expect(res.status).toBe(404)
  })

  it('should increase quantity of products in cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = '5e57b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})
    expect(res.status).toBe(200)

    res = await request(app)
      .put(`/api/v1/users/cart/increase/${userId}`)
      .send({userId, productId})

    expect(res.status).toBe(200)
    expect(res.body.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          'quantity': 2,
        })
      ])
    )
  })

  it('should not increase quantity of products in cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = '5e57b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})
    expect(res.status).toBe(200)

    res = await request(app)
      .put(`/api/v1/users/cart/increase/${userFakeId}`)
      .send({userFakeId, productId})

    expect(res.status).toBe(404)
  })

  it('should decrease quantity of products in cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = '5e57b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    const productName1 = 'Luna 3'
    const productId1 = 'e77b88b5744fa0b461c5573'
    const productVariant1 = 'Mint'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})
    expect(res.status).toBe(200)

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName1, productId1, productVariant1})
    expect(res.status).toBe(200)

    res = await request(app)
      .put(`/api/v1/users/cart/decrease/${userId}`)
      .send({userId, productId})

    expect(res.status).toBe(200)
    expect(res.body.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          'quantity': 1,
        })
      ])
    )
  })

  it('should not decrease quantity of products in cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id

    const productName = 'Luna 2'
    const productId = '5e57b88b5744fa0b461c5573'
    const productVariant = 'Pearl Pink'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, productName, productId, productVariant})
    expect(res.status).toBe(200)

    res = await request(app)
      .put(`/api/v1/users/cart/decrease/${userFakeId}`)
      .send({userFakeId, productId})

    expect(res.status).toBe(404)
  })
})