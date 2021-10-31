import { validationResult } from 'express-validator'
import { ColumnModel } from '../models/Column'
import { BoardController } from './BoardController'

const store = async (req, res) => {
  const errors = validationResult(req)
  const { title, boardId } = req.body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const newColumn = await new ColumnModel({
      title: title,
      board: boardId
    })

    await BoardController.updateColumnOrder(newColumn.board, newColumn._id.toString())

    newColumn.save()
    return res.status(200).json(newColumn)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

const updateCardOrder = async (columnId, cardId) => {
  try {
    const result = await ColumnModel.findOneAndUpdate(
      { _id: columnId },
      { $push: { cardOrder: cardId } },
      { new: true }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnController = {
  store,
  updateCardOrder
}
