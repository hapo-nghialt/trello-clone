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
  background: {
    type: Object,
    default: null
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
  private: {
    type: Boolean,
    default: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  members: {
    type: Array,
    default: []
  }
}, {
  versionKey: false
})

export const BoardModel = mongoose.model('Board', Board)
