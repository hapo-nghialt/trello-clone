import { Router } from 'express'
import { BoardController } from '../controllers/BoardController'
import { BoardValidation } from '../validations/Board'
const router = Router()

router.post(
  '/store',
  BoardValidation.create(),
  BoardController.create
)

router.get(
  '/:id',
  BoardController.getFullBoard
)

router.put(
  '/:id/update',
  BoardController.update
)

export const boardRoutes = router
