import {Request, Response, NextFunction} from 'express'
import request from 'supertest'

import { ProductDocument } from '../../src/models/Product'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const fakeId = '123456'

jest.mock(
  '../../src/middlewares/authenticate',
  () => (req: Request, res: Response, next: NextFunction) => next()
)

async function addProduct(override?: Partial<ProductDocument>) {
  let product = {
    name: 'Luna 2',
    category: 'skincare',
    variant: 'pearl pink',
    image: '',
    shortDescription: 'abc',
    longDescription: 'abcxyz',
    price: 1
  }

  if (override) {
    product = { ...product, ...override }
  }

  return await request(app)
    .post('/api/v1/products/admin')
    .send(product)
}

describe('product controller', () => {
  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const res = await addProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
  })

  it('should create a product with data that are not required', async () => {
    const res = await request(app)
      .post('/api/v1/products/admin')
      .send ({
        name: 'Luna 2',
        category: 'skincare',
        variant: 'pearl pink',
      })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
  })

  it('should not create a product with duplicate data', async () => {
    let res = await addProduct()
    expect(res.status).toBe(200)

    res = await request(app)
      .post('/api/v1/products/admin')
      .send({
        name: 'Luna 2',
        category: 'skincare',
        variant: 'pearl pink',
      })
    expect(res.status).toBe(400)
  })

  it('should not create a product when missing required data', async () => {
    const res = await request(app)
      .post('/api/v1/products/admin')
      .send({
        name: 'Luna 2',
      })
    expect(res.status).toBe(400)
  })

  it('should not create a product with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/products/admin')
      .send({
        name: 'Luna 2',
        category: 'skincare',
        variant: 'pearl pink',
        price: 0
      })
    expect(res.status).toBe(400)
  })
  
  it('should not create a product with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/products/admin')
      .send({
        name: 'Luna 2',
        category: 'skincare',
        variant: 'pearl pink',
        price: 1200
      })
    expect(res.status).toBe(400)
  })

  it('should return a list of products', async () => {
    const res = await addProduct()
    expect(res.status).toBe(200)

    const res1 = await addProduct({
      name: 'Luna 2 mini',
      category: 'skincare',
      variant: 'pearl pink',
    })
    expect(res1.status).toBe(200)

    const res2 = await request(app)
      .get(`/api/v1/products`)

    expect(res2.status).toBe(200)
    expect(res2.type).toEqual('application/json')
    expect(res2.body.length).toEqual(2)
  })

  it('should return a list of products using query', async () => {
    const res1 = await addProduct({
      name: 'Luna 2 mini',
      category: 'skincare',
      variant: 'red',
    })

    const res2 = await request(app)
      .get(`/api/v1/products/?search=Luna 2 mini`)

    expect(res2.status).toBe(200)
    expect(res2.type).toEqual('application/json')
    expect(res2.body.length).toEqual(1)
    expect(res2.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({name: 'Luna 2 mini'})
      ])
    )
  })

  it('should not return a list of products using query', async () => {
    const res = await addProduct()
    expect(res.status).toBe(200)

    const res1 = await request(app)
      .get(`/api/v1/products/?search=mimi`)

    expect(res1.status).toEqual(404)
  })

  it('should get back an existing product', async() => {
    let res = await addProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app)
      .get(`/api/v1/products/${productId}`)
    expect(res.body._id).toEqual(productId)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app)
      .get(`/api/v1/products/${fakeId}`)
    expect(res.status).toBe(404)
  })

  it('should update an existing product', async () => {
    let res = await addProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Luna 3',
      category: 'skin',
      variant: 'pearl pink',
    }

    res = await request(app)
      .put(`/api/v1/products/admin/${productId}`)
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Luna 3')
    expect(res.body.variant).toEqual('pearl pink')
  })

  it('should not update an existing product', async () => {
    let res = await addProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Luna 3',
      category: 'skin',
      variant: ['pearl pink', 'blue', 'mint'],
    }

    res = await request(app)
      .put(`/api/v1/products/admin/${fakeId}`)
      .send(update)

    expect(res.status).toBe(404)
  })

  it('should delete an existing product', async () => {
    let res = await addProduct()
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app)
      .delete(`/api/v1/products/admin/${productId}`)
    expect(res.status).toBe(204)

    res = await request(app)
      .get(`/api/v1/products/admin/${productId}`)
    expect(res.status).toBe(404)
  })

  it('should not delete a fake product', async () => {
    const res = await request(app)
      .delete(`/api/v1/products/admin/${fakeId}`)
    expect(res.status).toBe(404)
  })
})