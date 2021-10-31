import { Router } from 'express'
import { CardController } from '../controllers/CardController'
import { CardValidation } from '../validations/Card'
const router = Router()

router.post(
  '/store',
  CardValidation.store(),
  CardController.store
)

export const cardRoutes = router
