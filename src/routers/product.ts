import express from 'express'

import {
  findById,
  findAll,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/:productId', findById)
router.get('/', findAll)

//outer.put('/:movieId', updateMovie)
//router.delete('/:movieId', deleteMovie)
//router.post('/', createMovie)

export default router
