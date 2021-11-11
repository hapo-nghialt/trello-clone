import { BoardModel } from "../models/Board"
import { ObjectID } from "mongodb";

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
      _id: id,
    }).populate({
      path: 'columnOrder',
      match: { _destroy: false },
      populate: [
        {
          path: 'cardOrder',
          match: { _destroy: false }
        },
    ]
    })
    return board
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updatedData = {
      ...data,
      columnOrder: data.columnOrder.map($i => ObjectID($i._id)),
      updatedAt: Date.now()
    }

    const result = await BoardModel.findOneAndUpdate(
      { _id: id },
      updatedData
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = {
  store,
  updateColumnOrder,
  getFullBoard,
  update
}
