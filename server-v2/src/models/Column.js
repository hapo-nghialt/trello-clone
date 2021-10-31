import mongoose from 'mongoose'
const Schema = mongoose.Schema

let Column = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  cardOrder: {
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

export const ColumnModel = mongoose.model('Column', Column)
