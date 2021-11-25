import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import { boardReducer } from 'reducer/boardReducer'
import { API_ROOT } from 'utilities/constants'
import { CREATE_BOARD, GET_ALL_BOARDS, GET_ALL_BOARDS_FALSE } from './constants'

export const BoardContext = createContext()

const BoardContextProvider = ({ children }) => {
  // State
  const [boardState, dispatch] = useReducer(boardReducer, {
    board: null,
    boards: [],
    boardsLoading: true
  })

  // Get all boards
  const getAllBoards = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/boards`)
      if (response.data.success) {
        dispatch({
          type: GET_ALL_BOARDS,
          payload: response.data.boards
        })
      }
    } catch (error) {
      dispatch({
        type: GET_ALL_BOARDS_FALSE
      })
    }
  }

  // Board detail
  const getBoardDetail = async (id) => {
    try {
      const response = await axios.get(`${API_ROOT}/boards/${id}`)
      console.log(response)
      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
    }
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
      if (error.response.data) return error.response.data
    }
  }

  const boardContextData = {
    createNewBoard,
    getBoardDetail,
    getAllBoards,
    boardState
  }
  return (
    <BoardContext.Provider value={ boardContextData }>
      { children }
    </BoardContext.Provider>
  )
}

export default BoardContextProvider
