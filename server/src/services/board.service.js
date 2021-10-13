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
    const board = await BoardModel.getFullBoard(id)

    // Add card to each columns
    board.columns.forEach(column => {
      column.cards = board.cards.filter(c => c.columnId === column._id.toString())
    })

    // Remove cards data from board
    delete board.cards

    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, getFullBoard }
