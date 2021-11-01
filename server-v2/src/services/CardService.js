import { CardModel } from "../models/Card"
import { ColumnService } from "./ColumnService"

const store = async (data) => {
  try {
    const newCard = await new CardModel(data)
    await ColumnService.updateCardOrder(newCard.columnId, newCard._id)
    newCard.save()
    return newCard
  } catch (error) {
    throw new Error(error)
  }
}

export const CardService = { store }
