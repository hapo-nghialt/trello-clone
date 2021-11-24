import axios from 'axios'
import React, { createContext } from 'react'
import { API_ROOT } from 'utilities/constants'

export const BoardContext = createContext()

const BoardContextProvider = ({ children }) => {
  // State
  // const [state, dispatch] = useReducer(reducer, initialState, init)

  // Create new board
  const createNewBoard = async (request) => {
    try {
      const response = await axios.post(`${API_ROOT}/boards/store`, request)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const boardContextData = {
    createNewBoard
  }
  return (
    <BoardContext.Provider value={ boardContextData }>
      { children }
    </BoardContext.Provider>
  )
}

export default BoardContextProvider
