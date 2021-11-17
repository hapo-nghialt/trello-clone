import { validationResult } from "express-validator"
import { UserModel } from "../models/User"
import { AuthService } from "../services/AuthService"
const jwt = require('jsonwebtoken')

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
    const accessToken = jwt.sign(
      {
        // userId: registerData._id
        userId: '618cba55c08d59521e679c36'
      },
      process.env.ACCESS_TOKEN_SECRET
    )
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      registerData,
      accessToken
    })
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

const verifyUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select('-password')

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    } 
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const AuthController = {
  login,
  register,
  verifyUser
}
