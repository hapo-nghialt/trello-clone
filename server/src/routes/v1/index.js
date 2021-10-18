import express from 'express'
import { HttpStatusCode } from '@/utilities/constants'
import { boardRoutes } from './board.route'
import { columnRoutes } from './column.route'
import { cardRoutes } from './card.route'

const router = express.Router()

// Get status
router.get('/status', (req, res) => {
  res.status(HttpStatusCode.OK).json({ status: 'OK' })
})

// Boards
router.use('/boards', boardRoutes)

// // Columns
// router.use('/columns', columnRoutes)

// // Cards
// router.use('/cards', cardRoutes)

export const api = router
