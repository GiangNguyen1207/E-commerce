import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export type ProductDocument = Document & {
  name: string,
  category: string,
  variant: string[],
  size: string[]
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
  },
  category: {
    type: String,
    index: true
  },
  variant: {
    type: [String],
    index: true
  }
})

productSchema.plugin(uniqueValidator)

export default mongoose.model<ProductDocument>('Product', productSchema)
