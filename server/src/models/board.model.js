import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '../config/mongodb'

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(boardCollectionName).insertOne(value)
    const dataInDB = await getDB().collection(boardCollectionName).findOne(result.insertedId)
    return dataInDB
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB().collection(boardCollectionName).aggregate([
      {
        $match: { _id: ObjectID(boardId) }
      },
      {
        $addFields: {
          _idTest: { $toString: '$_id' }
        }
      },
      {
        $lookup: {
          from: 'columns',
          localField: '_idTest',
          foreignField: 'boardId',
          as: 'columns'
        }
      }
    ]).toArray()
    console.log(result)

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardModel = { createNew, getFullBoard }
