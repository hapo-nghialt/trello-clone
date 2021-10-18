import express from 'express'
import { BoardController } from '@/controllers/board.controller'
import { BoardValidation } from '@/validations/board.validation'

const router = express.Router()

// router.route('/')
//   .post(BoardValidation.createNew, BoardController.createNew)

// router.route('/:id')
//   .get(BoardController.getFullBoard)

router.get('/:id', async (req, res) => {
  try {
    res.status(200).json({
      success: true
    })
  } catch (error) {
    throw new Error(error)
  }
})

export const boardRoutes = router
