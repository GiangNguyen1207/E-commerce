import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string,
  category: string,
  variant: string[],
  size: string[]
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
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

export default mongoose.model<ProductDocument>('Product', productSchema)
