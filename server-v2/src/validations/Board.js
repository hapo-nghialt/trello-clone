import { body } from 'express-validator'

const create = () => {
  return [
    body('title', 'Title is required').exists(),
    body('title', 'Title is between 3 and 20 characters').isLength({ min: 3, max: 20 })
  ]
}

export const BoardValidation = { create }
