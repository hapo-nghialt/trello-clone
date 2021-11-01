import { validationResult } from 'express-validator'
import { CardService } from '../services/CardService'
import { ColumnController } from './ColumnController'

const store = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const newCard = await CardService.store(req.body)
    return res.status(200).json(newCard)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

export const CardController = { store }
