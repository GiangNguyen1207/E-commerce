import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type ProductDocument = Document & {
  name: string,
  category: string,
  variant: string,
  image: string,
  shortDescription: string,
  longDescription: string,
  price: number
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,

  },
  category: {
    type: String,
    required: true

  },
  variant: {
    type: String,
    required: true,
  },

  image: {
    type: String
  },

  shortDescription: {
    type: String
  },

  longDescription: {
    type: String
  },

  price: {
    type: Number
  }
})

productSchema.plugin(uniqueValidator)

export default mongoose.model<ProductDocument>('Product', productSchema)
