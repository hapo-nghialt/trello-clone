import { BoardService } from "../services/board.service"

const apiGetAllBoards = async (req, res, next) => {
  try {
    const boards = await BoardService.getAllBoard
    res.json(boards)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const BoardController = { apiGetAllBoards }