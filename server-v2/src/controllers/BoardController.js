import { validationResult } from 'express-validator'
import { BoardModel } from '../models/Board'

const store = async (req, res) => {
  const errors = validationResult(req)
  const { title } = req.body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const newBoard = await new BoardModel({
      title: title
    })

    newBoard.save()
    return res.status(200).json(newBoard)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

const updateColumnOrder = async (boardId, columnId) => {
  try {
    const result = await BoardModel.findOneAndUpdate(
      { _id: boardId },
      { $push: { columnOrder: columnId } },
      { new: true }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (req, res) => {
  try {
    const id = req.params.id
    
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

export const BoardController = {
  store,
  updateColumnOrder,
  getFullBoard
}
