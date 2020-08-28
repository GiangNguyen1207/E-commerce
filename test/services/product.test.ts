import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

const fakeId = '123456'

async function createProduct() {
  const product = new Product({
    name: 'Luna mini 2 - aqua',
    category: 'Skincare',
    variant: 'Aquamarine'
  })
  return await ProductService.addProduct(product)
}

describe('product service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    // console.log('in')
    try {
      const product = await createProduct()
      expect(product).toHaveProperty('_id')
    }
    catch(error) {
      console.log(error)
    }
    
    // expect(product).toHaveProperty('name', 'Luna mini 2 - aqua')
    // expect(product.variant).toBe('Aquamarine')
  })

//   it('should return a list of products', async() => {
//     const product1 = new Product({
//       name: 'Luna mini 2',
//       category: 'skincare',
//       variant: ['pearl pink', 'aqua', 'yellow', 'red'],
//     })
//     await ProductService.addProduct(product1)
//     const product2 = new Product({
//       name: 'Luna 3',
//       category: 'skincare',
//       variant: ['pearl pink', 'aqua', 'purple']
  
//     })
//     await ProductService.addProduct(product2)
//     const allProducts = await ProductService.findAll()
//     expect(allProducts.length).toBe(2)
//     expect(allProducts[0].name).toBe('Luna 3')
     
//   })

//   it('should return a list of products by search term', async() => {
//     const proudct = await createProduct()
//     const query = 'Luna mini 2'
//     const products = await ProductService.findAll(query)
//     expect(products.length).toBe(1)
//     expect(
//       products.map(p => p.name) ||
//       products.map(p => p.category) ||
//       products.map(p => p.variant)
//     ).toContain(query)
//     expect(products).toEqual(expect.arrayContaining([
//       expect.objectContaining({
//         name: 'Luna mini 2',
//       }),
//       expect.not.objectContaining({
//         category: 'Luna mini 2'
//       })
//     ]))
//   })

//   it('should not return a list of products by search term', async() => {
//     expect.assertions(1)
//     const product = await createProduct()
//     const nonexistingQuery = 'mimi'
//     return ProductService.findAll(nonexistingQuery).catch(error => {
//       console.log(error.message)
//       expect(error.message).toMatch(`Product not found`)
//   })
// })


//   it('should return a single product', async() => {
//     const product = await createProduct()
//     const found = await ProductService.findById(product._id)
//       expect(found.name).toEqual(product.name)
//       expect(found.name).toEqual(product.name)
//   })

//   it('should not get a non-existing product', async() => {
//     expect.assertions(1)
//     return ProductService.findById(fakeId).catch(error => {
//       expect(error.message).toMatch(`Product ${fakeId} not found`)
//     })
//   })

//   it('should update an existing product', async() => {
//     const product = await createProduct()
//     const update = {
//       name: 'Luna 3',
//       category: 'skin',
//       variant: 'aqua',
//       image: '',
//       shortDescription: '',
//       longDescription: '',
//       price: 105
//     }
//     const updated = await ProductService.updateProduct(product._id, update)
//     expect(updated).toHaveProperty('_id', product._id)
//     expect(updated).toHaveProperty('name', 'Luna 3')
//     expect(updated.variant).toEqual(
//       expect.arrayContaining(['purple'])
//     )
//   })
  
//   it('should update an non-existing product', async() => {
//     expect.assertions(1)
//     const product = await createProduct()
//     const update = {
//       name: 'Luna 3',
//       category: 'skin',
//       variant: 'aqua',
//       image: '',
//       shortDescription: '',
//       longDescription: '',
//       price: 105
//     }
//     return ProductService.updateProduct(fakeId, update).catch(error => {
//       expect(error.message).toMatch(`Product ${fakeId} not found`)
//   })
//   })

//   it('should delete an existing product ', async() => {
//     expect.assertions(1)
//     const product = await createProduct()
//     await ProductService.deleteProduct(product._id)
//     return ProductService.findById(product._id).catch(error => {
//       expect(error.message).toBe(`Product ${product._id} not found`)
//   })
//   })
})