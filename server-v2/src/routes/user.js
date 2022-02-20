import { Router } from "express";
import { UserController } from "../controllers/UserController";
import verifyToken from "../middlewares/auth";

const router = Router()

router.get(
  '/',
  verifyToken,
  UserController.get
)

export const userRoutes = router
