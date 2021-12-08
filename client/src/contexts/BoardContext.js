import axios from 'axios'
import React, { createContext, useEffect, useReducer } from 'react'
import { boardReducer } from 'reducer/boardReducer'
import { API_ROOT } from 'utilities/constants'
import { sleep } from 'utilities/sleep'
import { CREATE_BOARD, GET_ALL_BOARDS, GET_ALL_BOARDS_FALSE, GET_DETAIL_BOARD } from './constants'

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
      dispatch({
        type: 'SET_LOADING',
        payload: true
      })
      const response = await axios.get(`${API_ROOT}/boards/${id}`)
      await sleep(1000)
      if (response.data.success) {
        dispatch({
          type: GET_DETAIL_BOARD,
          payload: response.data.board
        })
        return response.data.board
      }
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
