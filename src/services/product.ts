import _isEmpty from 'lodash/isEmpty'

import Product, { ProductDocument } from '../models/Product'

function findAll(searchTerm?: string): Promise<ProductDocument[]> {
  return Product.find()
    .sort({name:1})
    .limit(10)
    .exec() //Return a promise
    .then(product => {
      if(!_isEmpty(searchTerm)) {
      return Product.find({
        $or: [
          {name: searchTerm},
          {category: searchTerm},
          {variant: {$in: searchTerm}}
        ]
      })
      .exec()
      .then(filteredProducts => {
        if(!_isEmpty(filteredProducts)) {
          return filteredProducts
        }
        if(_isEmpty(filteredProducts)) {
          throw new Error('Product not found')
        }
        return filteredProducts
      })}
      return product
    })
      /*let filteredProducts: any
      filteredProducts = Product.find({
        $or: [
          {name: searchTerm},
          {category: searchTerm},
          {variant: {$in: searchTerm}}
        ]
      })
      return (_isEmpty(filteredProducts)? 
        product 
        : filteredProducts)
    })*/
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then(product => {
      if(!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}


function addProduct(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function updateProduct(
  productId: string,
  updatedProduct: Partial<ProductDocument>,
  ): Promise<ProductDocument> {
    return Product.findById(productId)
      .exec()
      .then(product => {
        if(!product) {
          throw new Error(`Product ${productId} not found`)
        }
        if(updatedProduct.name) {
          product.name = updatedProduct.name
        }
        if(updatedProduct.category) {
          product.category = updatedProduct.category
        }
        if(updatedProduct.variant) {
          product.variant = updatedProduct.variant
        }
        return product.save()
      })

}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}
/*
function update(
  movieId: string,
  update: Partial<MovieDocument>
): Promise<MovieDocument> {
  return Movie.findById(movieId)
    .exec()
    .then(movie => {
      if (!movie) {
        throw new Error(`Movie ${movieId} not found`)
      }

      if (update.name) {
        movie.name = update.name
      }
      if (update.publishedYear) {
        movie.publishedYear = update.publishedYear
      }
      if (update.duration) {
        movie.duration = update.duration
      }

      // Add more fields here if needed
      return movie.save()
    })
}

function deleteMovie(movieId: string): Promise<MovieDocument | null> {
  return Movie.findByIdAndDelete(movieId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteMovie,
}*/

export default { 
  findById,
  findAll,
  addProduct,
  updateProduct,
  deleteProduct
}
