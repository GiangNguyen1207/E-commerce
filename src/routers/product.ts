import express from 'express'

import {
  findById,
  findAll,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:productId', findById)
router.post('/admin', addProduct)
router.put('/admin/:productId', updateProduct)
router.delete('/admin/:productId', deleteProduct)

export default router
