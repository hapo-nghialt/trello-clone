import { body } from 'express-validator'

const store = () => {
  return [
    body('title', 'Title is required').exists(),
    body('title', 'Title is between 3 and 30 characters').isLength({ min: 3, max: 30 })
  ]
}

export const CardValidation = { store }
