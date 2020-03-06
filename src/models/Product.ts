import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type ProductDocument = Document & {
  name: string,
  category: string,
  variant: string[],
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
    type: [String],
    required: true,
  }
})

productSchema.plugin(uniqueValidator)

export default mongoose.model<ProductDocument>('Product', productSchema)
