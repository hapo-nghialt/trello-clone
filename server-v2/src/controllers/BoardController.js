import { validationResult } from 'express-validator'
import { BoardService } from '../services/BoardService'
// import {BoardModel} from "../models/Board";

const store = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const newBoard = await BoardService.store(req.body)
    return res.status(200).json(newBoard)
  } catch (error) {
    return res.status(500).json({
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
  store,
  getFullBoard,
  update
}
