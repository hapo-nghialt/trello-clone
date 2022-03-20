import { UserModel } from '../models/User'
const hoaxer = require('hoaxer')

const passwordHash = require('password-hash')

let seedUsers = []

for (let i = 0; i < 50; i++) {
  let newUser = {
    username: hoaxer.name.firstName(),
    email: hoaxer.internet.email(),
    password: passwordHash.generate('12345678'),
    _destroy: false
  }

  seedUsers.push(newUser)
}

export const seedDB = async () => {
  await UserModel.insertMany(seedUsers)
}
