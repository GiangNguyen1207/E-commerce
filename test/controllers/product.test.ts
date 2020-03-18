import {Request, Response, NextFunction} from 'express'
import request from 'supertest'
import mongoose from 'mongoose'

import Product, { ProductDocument } from '../../src/models/Product'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const fakeId = '5e57b77b5744fa0b461c5573'

jest.mock(
  '../../src/middlewares/authenticate',
  () => (req: Request, res: Response, next: NextFunction) => next()
)

async function createProduct(override?: Partial<ProductDocument>) {
  let product = {
    name: 'Luna 2',
    category: 'skincare',
    variant: 'pearl pink',
  }

  if (override) {
    product = { ...product, ...override }
  }

  return await request(app)
    .post('/api/v1/products/admin')
    .send(product)
}

describe('product controller', () => {
  beforeEach(async() => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
  })

  it('should not create a movie with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/products/admin')
      .send({
        variant: 'nude'
      })
    expect(res.status).toBe(400)
  })

  it('should return a list of products', async () => {
    const res1 = await createProduct({
      name: 'Luna 2 mini',
      category: 'skincare',
      variant: 'pearl pink',
    })

    const res2 = await createProduct({
      name: 'Luna 3',
      category: 'skincare',
      variant: 'aqua',
    })

    const res3 = await request(app)
      .get(`/api/v1/products`)

    expect(res3.status).toBe(200)
    expect(res3.type).toEqual('application/json')
    expect(res3.body.length).toEqual(2)
  })

  it('should return a list of products using query', async () => {
    const res1 = await createProduct({
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
    const res = await createProduct()
    expect(res.status).toBe(200)

    const res1 = await request(app)
      .get(`/api/v1/products/?search=mimi`)

    expect(res1.status).toEqual(404)
  })

  it('should get back an existing product', async() => {
    let res = await createProduct()
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
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Luna 3',
      category: 'skin',
      variant: ['pearl pink', 'blue', 'mint'],
    }

    res = await request(app)
      .put(`/api/v1/products/admin/${productId}`)
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Luna 3')
    expect(res.body.variant).toEqual(
      expect.arrayContaining(['mint'])
    )
  })

  it('should not update an existing product', async () => {
    let res = await createProduct()
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

    expect(res.status).toEqual(404)
  })

  it('should delete an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app)
      .delete(`/api/v1/products/admin/${productId}`)
    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/products/admin/${productId}`)
    expect(res.status).toBe(404)
  })

})

