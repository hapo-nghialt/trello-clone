import Joi from 'joi'
import { getDB } from '@/config/mongodb'
import { maxCardLength, minCardLength } from '@/utilities/constants'

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(minCardLength).max(maxCardLength).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(cardCollectionName).insertOne(value)
    const dataInDB = await getDB().collection(cardCollectionName).findOne(result.insertedId)
    return dataInDB

  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = { cardCollectionName, createNew }
