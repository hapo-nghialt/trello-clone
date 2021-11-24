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
    type: Schema.Types.Array,
    default: [],
    ref: 'Column'
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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  versionKey: false
})

export const BoardModel = mongoose.model('Board', Board)
