import { validationResult } from "express-validator";
import { AuthService } from "../services/AuthService";

const login = async (req, res) => {
  const loginData = await AuthService.login(req.body)
}

const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    })
  }
  try {
    const registerData = await AuthService.register(req.body)
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      registerData
    })
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

export const AuthController = {
  login,
  register
}
