import { validationResult } from 'express-validator'
import { CardModel } from '../models/Card'
import { ColumnController } from './ColumnController'

const store = async (req, res) => {
  const errors = validationResult(req)
  const { title, boardId, columnId } = req.body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const newCard = await new CardModel({
      title: title,
      board: boardId,
      column: columnId
    })

    await ColumnController.updateCardOrder(newCard.column, newCard._id.toString())

    newCard.save()
    return res.status(200).json(newCard)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

export const CardController = { store }
