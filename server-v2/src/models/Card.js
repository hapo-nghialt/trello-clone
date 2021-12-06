import mongoose from 'mongoose'
const Schema = mongoose.Schema

let Card = new Schema({
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  columnId: {
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
  description: {
    type: String,
    default: null
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
