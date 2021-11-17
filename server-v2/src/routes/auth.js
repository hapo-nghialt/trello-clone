import { Router } from 'express'
import { AuthController } from '../controllers/AuthController';
import verifyToken from '../middlewares/auth';
import { AuthValidation } from '../validations/Auth';

const router = Router();

router.get(
  '/',
  verifyToken,
  AuthController.verifyUser
)

router.post(
  '/login',
  AuthController.login
)

router.post(
  '/register',
  AuthValidation.register(),
  AuthController.register
)

export const authRoutes = router
