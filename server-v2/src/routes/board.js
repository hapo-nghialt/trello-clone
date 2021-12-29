import { Router } from 'express'
import { BoardController } from '../controllers/BoardController'
import verifyToken from '../middlewares/auth'
import { BoardValidation } from '../validations/Board'
const router = Router()

router.get(
  '/',
  verifyToken,
  BoardController.get
)

router.post(
  '/store',
  BoardValidation.create(),
  BoardController.create
)

router.get(
  '/:id/:userId',
  BoardController.getDetailBoard
)

router.put(
  '/:id/update',
  BoardController.update
)

export const boardRoutes = router
