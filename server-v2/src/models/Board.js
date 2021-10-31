import mongoose from 'mongoose'
const Schema = mongoose.Schema

let Board = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  columnOrder: {
    type: Array,
    default: []
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

export const BoardModel = mongoose.model('Board', Board)
