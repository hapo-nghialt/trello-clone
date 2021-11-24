import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import { boardReducer } from 'reducer/boardReducer'
import { API_ROOT } from 'utilities/constants'
import { CREATE_BOARD, GET_ALL_BOARDS_FALSE } from './constants'

export const BoardContext = createContext()

const BoardContextProvider = ({ children }) => {
  // State
  const [boardState, dispatch] = useReducer(boardReducer, {
    board: null,
    boards: [],
    boardsLoading: true
  })

  // Get all boards
  const getAllBoard = async () => {
    // try {
      
    // } catch (error) {
    //   dispatch({
    //     type: GET_ALL_BOARDS_FALSE
    //   })
    // }
  }

  // Create new board
  const createNewBoard = async (request) => {
    try {
      const response = await axios.post(`${API_ROOT}/boards/store`, request)
      if (response.data.success) {
        dispatch({
          type: CREATE_BOARD,
          payload: response.data.newBoard
        })
      }
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const boardContextData = {
    createNewBoard,
    boardState
  }
  return (
    <BoardContext.Provider value={ boardContextData }>
      { children }
    </BoardContext.Provider>
  )
}

export default BoardContextProvider
