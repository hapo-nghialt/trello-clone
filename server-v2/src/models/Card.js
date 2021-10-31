import mongoose from 'mongoose'
const Schema = mongoose.Schema

let Card = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: 'Column'
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  cover: {
    type: String,
    default: null
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

export const CardModel = mongoose.model('Card', Card)
