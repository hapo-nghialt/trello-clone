import { body } from "express-validator"
import { UserModel } from "../models/User"

const register = () => {
  return [
    body('username').custom(value => {
      return UserModel.findOne({ username: value }).then(user => {
        if (user) {
          return Promise.reject('Username already taken')
        }
      })
    })
  ]
}

export const AuthValidation = { register }
