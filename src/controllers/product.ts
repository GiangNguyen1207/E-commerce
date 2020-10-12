import { Request, Response, NextFunction } from 'express'

import Product, { ProductDocument } from '../models/Product'
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
    let totalPages: number
    const page = Number(req.query.page)
    const startIndex = (page - 1) * 9
    const endIndex = page * 9
    const allProducts = await ProductService.findAll(req.query.search)
    if (allProducts.length % 9 === 0) {
      totalPages = allProducts.length / 9
    } else totalPages = Math.floor(allProducts.length / 9) + 1
    res.json({
      totalPages: totalPages,
      allProducts: allProducts,
      products: allProducts.slice(startIndex, endIndex),
    })
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
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      category,
      variant,
      image,
      shortDescription,
      longDescription,
      price,
    } = req.body

    const newProduct = new Product({
      name: name,
      category: category,
      variant: variant,
      image: image,
      shortDescription: shortDescription,
      longDescription: longDescription,
      price: price,
    })

    await ProductService.addProduct(newProduct)
    res.json(newProduct)
  } catch (error) {
    if (error.name.includes('ValidationError')) {
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
    const updatedProduct = await ProductService.updateProduct(
      productId,
      product
    )
    res.json(updatedProduct)
  } catch (error) {
    next(new NotFoundError('Product not found', error))
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
