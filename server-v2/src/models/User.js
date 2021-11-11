import mongoose from 'mongoose'
const Schema = mongoose.Schema

let User = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  },
  _destroy: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false
})

export const UserModel = mongoose.model('User', User)
