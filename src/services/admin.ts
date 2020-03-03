import Admin, { AdminDocument } from '../models/Admin'
import Product, { ProductDocument } from '../models/Product';

function addProduct(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function updateProduct(
  updatedProduct: Partial<ProductDocument>,
  productId: string
  ): Promise<ProductDocument> {
    return Product.findById(productId)
      .exec()
      .then(product => {
        if(!product) {
          throw new Error(`Product ${product} not found`)
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

export default {
  addProduct,
  updateProduct,
  deleteProduct
}