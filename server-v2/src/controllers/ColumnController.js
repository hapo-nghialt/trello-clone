import { validationResult } from 'express-validator'
import { ColumnService } from '../services/ColumnService'

const store = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const newColumn = await ColumnService.store(req.body)
    return res.status(200).json(newColumn)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id
    const result = await ColumnService.update(id, req.body)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({
      errors: error.message
    })
  }
}

export const ColumnController = {
  store,
  update
}
