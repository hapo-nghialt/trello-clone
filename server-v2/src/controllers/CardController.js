import { validationResult } from 'express-validator'
import { CardModel } from '../models/Card'
import { CardService } from '../services/CardService'
import { ObjectId } from 'mongodb'

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
      success: false,
      errors: error.message
    })
  }
}

const update = async (req, res) => {
  const updatedCard = req.body

  try {
    const card = await CardModel.findByIdAndUpdate(
      updatedCard._id,
      updatedCard,
      { returnOriginal: false }
    ).exec()

    return res.status(200).json({
      success: true,
      card
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error.message
    })
    
  }
}

export const CardController = { store, update }
