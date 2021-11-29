import { Router } from 'express'
import { CardController } from '../controllers/CardController'
import { CardValidation } from '../validations/Card'
const router = Router()

router.post(
  '/store',
  CardValidation.store(),
  CardController.store
)

router.put(
  '/:id',
  CardController.update
)

export const cardRoutes = router
