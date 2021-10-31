import { Router } from 'express'
import { BoardController } from '../controllers/BoardController'
import { BoardValidation } from '../validations/Board'
const router = Router()

router.post(
  '/store',
  BoardValidation.store(),
  BoardController.store
)

router.get(
  '/:id',
  BoardController.getFullBoard
)

export const boardRoutes = router
