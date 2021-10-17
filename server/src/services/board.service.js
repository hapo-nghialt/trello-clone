import { BoardModel } from '@/models/board.model'
import { cloneDeep } from 'lodash'


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

    if (!board || !board.columns) {
      throw new Error('Board not found!')
    }

    const transformBoard = cloneDeep(board)
    // Filter deleted column
    transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)

    // Add card to each columns
    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnId === column._id.toString())
    })

    // Remove cards data from board
    delete transformBoard.cards

    return transformBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, getFullBoard }
