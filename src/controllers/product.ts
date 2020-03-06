import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

export const findAll = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findAll(req.query.search))
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findById(req.params.productId))
  } catch(error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const {name, category, variant} = req.body

  const newProduct = new Product({
    name: name,
    category: category,
    variant: variant
  })

  await ProductService.addProduct(newProduct)
  res.json(newProduct)
  } catch(error) {
    if(error.name = 'ValidationError') {
      next(new BadRequestError(error.message, error))
  } 
      next(new InternalServerError('Internal Server Error', error))
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const product = req.body
  const productId = req.params.productId
  const updatedProduct = await ProductService.updateProduct(productId, product)
  res.json(updatedProduct)
} catch (error) {
  next (new NotFoundError('Product not found', error))
}
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

