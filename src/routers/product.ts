import express from 'express'

import {
  findById,
  findAll,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/:productId', findById)
router.get('/', findAll)
router.post('/admin', addProduct)
router.put('/admin/:productId', updateProduct)
router.post('/admin/:productId', deleteProduct)
router.delete('/admin/:productId', deleteProduct)

export default router
