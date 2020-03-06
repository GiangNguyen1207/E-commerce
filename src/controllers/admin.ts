import { Request, Response, NextFunction } from 'express'

import AdminService from '../services/admin'
import Admin from '../models/Admin'
import Product from '../models/Product';
import { BadRequestError, InternalServerError, NotFoundError } from '../helpers/apiError'

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

  await AdminService.addProduct(newProduct)
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
  const updatedProduct = await AdminService.updateProduct(product, productId)
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
    await AdminService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

