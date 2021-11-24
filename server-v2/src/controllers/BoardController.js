import { validationResult } from 'express-validator'
import { BoardService } from '../services/BoardService'
import { ObjectId } from 'mongodb'
import { BoardModel } from '../models/Board'

const get = async (req, res) => {
  // const boards = BoardModel.find({ user })
}

const create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { title, userId } = req.body
  console.log(ObjectId(userId))

  try {
    const newBoard = new BoardModel({
      title,
      userId: ObjectId(userId)
    })

    await newBoard.save()
    return res.status(200).json({
      success: true,
      newBoard
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error.message
    })
  }
}

const getFullBoard = async (req, res) => {
  try {
    const id = req.params.id
    const result = await BoardService.getFullBoard(id)
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id
    const result = await BoardService.update(id, req.body)
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

export const BoardController = {
  get,
  create,
  getFullBoard,
  update
}
