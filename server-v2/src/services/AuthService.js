import { UserModel } from '../models/User'

const bcrypt = require('bcrypt')

const login = (data) => {
}

const register = (data) => {
  const { username, password } = data
  UserModel.findOne(
    { username: username }
  ).exec(function (err, user) {
    if (user == null) {
      bcrypt.hash(password, 10,async function(err, hash) {
        const user = await new UserModel(data)
        user.password = hash
        user.save()
        return user
      })
    } else {
      return {err: 'Email has been used'}
    }
  })
}

export const AuthService = {
  login,
  register
}
