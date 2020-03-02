import mongoose from 'mongoose'
import _isEmpty from 'lodash/isEmpty'

import Product, { ProductDocument } from '../models/Product'

function findAll(searchTerm: string): Promise<ProductDocument[] | undefined> {
  return Product.find()
    .sort({name:1})
    .limit(10)
    .exec() //Return a promise
    .then(product => {
      if(searchTerm) {
        let filteredProducts = Product.find({
          $or: [
            {name: searchTerm},
            {category: searchTerm},
            {variant: {$in: searchTerm}}
          ]
        })
        if(!_isEmpty(filteredProducts)) {
          return filteredProducts
        } 
      } return product
      
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
        : filteredProducts)*/
    })
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then(product => {
      if(!product) {
        throw new Error(`Product ${product} not found`)
      }
      return product
    })
}

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
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
  create, 
  findById,
  findAll,
}
