import express from 'express'
import { authRoutes } from './auth'
import { boardRoutes } from './board'
import { cardRoutes } from './card'
import { columnRoutes } from './column'
import { userRoutes } from './user'

const router = express.Router()

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

router.use('/boards', boardRoutes)

router.use('/users', userRoutes)

router.use('/columns', columnRoutes)

router.use('/cards', cardRoutes)

router.use('/auth', authRoutes)

module.exports = router
