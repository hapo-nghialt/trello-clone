import { validationResult } from "express-validator"
import { UserModel } from "../models/User"

const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    // Check for existing user
    const user = await UserModel.findOne({ username })

    if (!user) return res.status(400).json({
      success: false,
      message: 'Incorrect username/password'
    })

    // Check password
    const passwordValid = await passwordHash.verify(password, user.password)
    if (!passwordValid) return res.status(400).json({
      success: false,
      message: 'Incorrect username/password'
    })

    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    )

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      accessToken
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error.message
    })
  }
}

// Register user
const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    })
  }

  const { username, email, password } = req.body

  try {
    const registerData = new UserModel({
      username: username,
      email: email,
      password: passwordHash.generate(password)
    })

    await registerData.save()

    const accessToken = jwt.sign(
      {
        userId: registerData._id
      },
      process.env.ACCESS_TOKEN_SECRET
    )

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      accessToken
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error.message
    })
  }
}

// Verify user
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
