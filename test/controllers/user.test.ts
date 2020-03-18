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
    firstName: 'Gigi',
    lastName: 'Nguyen',
    username: 'gigixinhgai',
    email: 'gigixinhgai@gmail.com',
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
  beforeAll(async () => {
    jest.setTimeout(10000)
  })

  beforeEach(async () => {
    await dbHelper.connect()
  })

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

  it('should not create a user', async() => {
    await createUser()
    const res1 = await createUser()
    expect(res1.status).toBe(400)
  })


  it('should sign in a user', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const user = {
      username: 'gigixinhgai',
      password: '123456789'
    }
    
    res = await request(app)
      .post('/api/v1/users/signIn')
      .send(user)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user).toHaveProperty('username', 'gigixinhgai')
  })

  it('should not sign in a user', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const user = {
      username: 'gigixinhdep',
      password: 'gigixinhgaiqua,'
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
      firstName: 'chipchip',
      lastName: 'meomeo',
      email: 'chipchip@gmail.com'
    }

    res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send(update)

    expect(res.status).toBe(200)
    expect(res.body.email).toBe('chipchip@gmail.com')
  })

  it('should not update user profile', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const update = {
      firstName: 'chipchip',
      lastName: 'meomeo',
      email: 'chipchip@gmail.com'
    }

    res = await request(app)
      .put(`/api/v1/users/${userFakeId}`)
      .send(update)

    expect(res.status).toBe(404)
  })

  /*it('should send the email', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    res = await request(app)
      .post(`/api/v1/users/forgotPassword`)
      .send({email: 'gigixinhgai@gmail.com'})

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message', 'Email sent successfully')
  })

  it('should not send the email', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    res = await request(app)
      .post(`/api/v1/users/forgotPassword`)
      .send({email: 'chipchip@gmail.com'})

    expect(res.status).toBe(404)
  })*/

  it('should allow changing password', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const oldPassword = '123456789'
    const newPassword = 'gigixinhdep12'

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
    const newPassword = 'gigixinhdep12'

    res = await request(app)
      .put(`/api/v1/users/changePassword/${userFakeId}`)
      .send({userFakeId, oldPassword, newPassword})
    expect(res.status).toBe(404)
  })


  it('should not allow changing password', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const oldPassword = '0123456789'
    const newPassword = 'gigixinhdep12'

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
    const product = 'Luna 2'
    const variant = 'pearl pink'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, product, variant})

    expect(res.status).toBe(200)
    expect(res.body.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({'name': 'Luna 2', 'variant': 'pearl pink'})
      ])
    )
  })

  it('should not add product to cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const product = 'Luna 3'
    const variant = 'aqua'

    res = await request(app)
      .post(`/api/v1/users/cart/${userFakeId}`)
      .send({userFakeId, product, variant})
    expect(res.status).toBe(404)
  })

  it('should get cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id
    const product = 'Luna 2'
    const variant = 'pearl pink'

    const product1 = 'Luna 3'
    const variant1 = 'aqua'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, product, variant})

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, product1, variant1})

    const get = await request(app)
      .get(`/api/v1/users/cart/${userId}`)

    expect(get.status).toBe(200)
    expect(get.body.cart.length).toBe(2)
  })

  it('should not get cart', async() => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.user._id
    const product = 'Luna 2'
    const variant = 'pearl pink'

    const product1 = 'Luna 3'
    const variant1 = 'aqua'

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, product, variant})

    res = await request(app)
      .post(`/api/v1/users/cart/${userId}`)
      .send({userId, product1, variant1})

    const get = await request(app)
      .get(`/api/v1/users/cart/${userFakeId}`)

    expect(get.status).toBe(404)
  })

})