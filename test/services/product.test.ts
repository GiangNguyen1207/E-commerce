import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

const fakeId = '5e57b77b5744fa0b461c5573'

async function createProduct() {
  const product = new Product({
    name: 'Luna 2',
    category: 'Skincare',
    variant: 'Pearl Pink',
    image: '',
    shortDescription: '',
    longDescription: '',
    price: 1
  })
  return await ProductService.addProduct(product)
}

describe('product service', () => {
  beforeAll(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Luna 2')
    expect(product.variant).toBe('Pearl Pink')
  })

  it('should create a product with missing optional data', async () => {
    let product = new Product({
      name: 'Luna 2',
      category: 'Skincare',
      variant: 'Pearl Pink',
    })
    product = await ProductService.addProduct(product)
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Luna 2')
    expect(product.variant).toBe('Pearl Pink')
  })

  it('should not create a product with duplicate data', async () => {
    expect.assertions(1)
    await createProduct()
    const product =  new Product({
      name: 'Luna 2',
      category: 'Skincare',
      variant: 'Pearl Pink',
    })
    return ProductService.addProduct(product).catch(error => {
      expect(error.message).toMatch('Product validation failed')
    })
  })

  it('should not create a product with required data missing', async () => {
    expect.assertions(1)
    const product =  new Product({
      category: 'Skincare',
      variant: 'Pearl Pink',
    })
    return ProductService.addProduct(product).catch(error => {
      expect(error.message).toMatch('Product validation failed')
    })
  })

  it('should not create a product with wrong data', async () => {
    expect.assertions(1)
    const product =  new Product({
      name: 'Luna 2',
      category: 'Skincare',
      variant: 'Pearl Pink',
      price: 0
    })
    return ProductService.addProduct(product).catch(error => {
      expect(error.message).toMatch('Product validation failed')
    })
  })

  it('should not create a product with wrong data', async () => {
    expect.assertions(1)
    const product =  new Product({
      name: 'Luna 2',
      category: 'Skincare',
      variant: 'Pearl Pink',
      price: 1200
    })
    return ProductService.addProduct(product).catch(error => {
      expect(error.message).toMatch('Product validation failed')
    })
  })


  it('should return all products', async() => {
    await createProduct()
    const anotherProduct = new Product({
      name: 'Luna fofo',
      category: 'Skincare',
      variant: 'Fuchsia'
    })
    await ProductService.addProduct(anotherProduct)
    const all = await ProductService.findAll()
    expect(all.length).toBe(2)
    expect(all[0].name).toBe('Luna 2')  
    expect(all[1].name).toBe('Luna fofo')  
  })

  it('should return a list of products by search term - name', async() => {
    await createProduct()
    const query = 'Luna 2'
    const products = await ProductService.findAll(query)
    expect(products.length).toBe(1)
    expect(products.map(p => p.name)).toContain(query)
    expect(products).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'Luna 2',
      }),
      expect.not.objectContaining({
        category: 'Luna 2'
      })
    ]))
  })


  it('should return a list of products by search term - category', async() => {
    await createProduct()
    const anotherProduct = new Product({
      name: 'Luna fofo',
      category: 'Skincare',
      variant: 'Fuchsia'
    })
    await ProductService.addProduct(anotherProduct)
    const query = 'Skincare'
    const products = await ProductService.findAll(query)
    expect(products.length).toBe(2)
    expect(
      products.map(p => p.category)
    ).toContain(query)
  })

  it('should return a list of products by search term - variant', async() => {
    await createProduct()
    const anotherProduct = new Product({
      name: 'Luna fofo',
      category: 'Skincare',
      variant: 'Fuchsia'
    })
    await ProductService.addProduct(anotherProduct)
    const query = 'Fuchsia'
    const products = await ProductService.findAll(query)
    expect(products.length).toBe(1)
    expect(
      products.map(p => p.variant)
    ).toContain(query)
    expect(products).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: 'Luna fofo',
      }),
      expect.not.objectContaining({
        category: 'Luna 2'
      })
    ]))
  })

  it('should not return a list of products by search term', async() => {
    expect.assertions(1)
    await createProduct()
    const nonexistingQuery = 'sport'
    return ProductService.findAll(nonexistingQuery).catch(error => {
      expect(error.message).toMatch(`Product not found`)
  })
})

  it('should return a single product', async() => {
    const product = await createProduct()
    const found = await ProductService.findById(product._id)
      expect(found.name).toEqual(product.name)
      expect(found.name).toEqual(product.name)
  })

  it('should not get a non-existing product', async() => {
    expect.assertions(1)
    return ProductService.findById(fakeId).catch(error => {
      expect(error.message).toMatch(`Product ${fakeId} not found`)
    })
  })

  it('should update an existing product', async() => {
    const product = await createProduct()
    const update = {
      name: 'ISSA Play',
      category: 'Oral care',
      variant: 'Summer Sky',
      image: '',
      shortDescription: '',
      longDescription: '',
      price: 105
    }
    const updated = await ProductService.updateProduct(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated).toHaveProperty('name', 'ISSA Play')
    expect(updated).toHaveProperty('category', 'Oral care')
    expect(updated).toHaveProperty('variant', 'Summer Sky')
    
  })
  
  it('should update an non-existing product', async() => {
    expect.assertions(1)
    await createProduct()
    const update = {
      name: 'ISSA Play',
      category: 'Oral care',
      variant: 'Summer Sky',
      image: '',
      shortDescription: '',
      longDescription: '',
      price: 105
    }
    return ProductService.updateProduct(fakeId, update).catch(error => {
      expect(error.message).toMatch(`Product ${fakeId} not found`)
  })
  })

  it('should delete an existing product ', async() => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product._id)
    return ProductService.findById(product._id).catch(error => {
      expect(error.message).toBe(`Product ${product._id} not found`)
  })
  })
})