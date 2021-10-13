import { BoardModel } from '@/models/board.model'


const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (id) => {
  try {
    const result = await BoardModel.getFullBoard(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, getFullBoard }
