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
    }),
    body('username', 'Username is between 3 and 20 characters').isLength({ min: 3, max: 20 })
  ]
}

export const AuthValidation = { register }
