import { Router } from 'express'
const router = Router()

import { BoardController } from '../controllers/BoardController'
import { BoardValidation } from '../validations/Board'

router.post(
  '/store',
  BoardValidation.store(),
  BoardController.store
)

export const boardRoutes = router
