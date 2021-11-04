import { ColumnModel } from "../models/Column"
import { BoardService } from "./BoardService"
import { ObjectID } from "mongodb";

const store = async (data)  => {
  try {
    const newColumn = await new ColumnModel(data)
    await BoardService.updateColumnOrder(newColumn.boardId, newColumn._id)
    newColumn.save()
    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}

const updateCardOrder = async (columnId, cardId) => {
  try {
    const result = await ColumnModel.findOneAndUpdate(
      { _id: columnId },
      { $push: { cardOrder: cardId } },
      { new: true }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updatedData = {
      ...data,
      cardOrder: data.cardOrder.map($i => ObjectID($i._id)),
      updatedAt: Date.now()
    }
    delete updatedData.boardId, updatedData.columnId

    if (updatedData._destroy) {
    }

    const result = await ColumnModel.findOneAndUpdate(
      { _id: id },
      updatedData
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = {
  store,
  updateCardOrder,
  update
}
