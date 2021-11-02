import { Router } from 'express'
import { ColumnController } from '../controllers/ColumnController'
import { ColumnValidation } from '../validations/Column'
const router = Router()

router.post(
  '/store',
  ColumnValidation.store(),
  ColumnController.store
)

router.put(
  '/:id',
  ColumnController.update
)

export const columnRoutes = router
