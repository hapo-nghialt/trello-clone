import { BoardModel } from "../models/board.model"

const getAllBoard = async () => {
  try {
    const allBoards = await BoardModel.find()
    return allBoards
  } catch (error) {
    console.log(error.message)
  }
}

export const BoardService = { getAllBoard }
