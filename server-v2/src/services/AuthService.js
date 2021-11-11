import { UserModel } from '../models/User'

const passwordHash = require('password-hash')

const login = (data) => {
}

const register = async (data) => {
  const { username, password } = data
  try {
    const newUser = await new UserModel({
      username: username,
      password: passwordHash.generate(password)
    })
    newUser.save()
    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

export const AuthService = {
  login,
  register
}
