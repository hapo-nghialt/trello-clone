import { BoardModel } from "../models/Board"

const store = async (data) => {
  try {
    const newBoard = await new BoardModel(data)
    newBoard.save()
    return newBoard
  } catch (error) {
    throw new Error(error)
  }
}

const updateColumnOrder = async (boardId, columnId) => {
  try {
    const result = await BoardModel.findOneAndUpdate(
      { _id: boardId },
      { $push: { columnOrder: columnId } },
      { new: true }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (id) => {
  try {
    const board = await BoardModel.findOne({
      _id: id
    }).populate({
      path: 'columnOrder',
      populate: [
        { path: 'cardOrder' },
    ]
    })
    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  store,
  updateColumnOrder,
  getFullBoard
}
