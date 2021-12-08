import { CREATE_BOARD, GET_ALL_BOARDS, GET_ALL_BOARDS_FALSE, GET_DETAIL_BOARD } from 'contexts/constants'

export const boardReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
  case CREATE_BOARD:
    return {
      ...state,
      boards: [...state.boards, payload]
    }

  case GET_ALL_BOARDS:
    return {
      ...state,
      boards: payload,
      boardsLoading: false
    }

  case GET_ALL_BOARDS_FALSE:
    return {
      ...state,
      boards: [],
      boardsLoading: false
    }

  case GET_DETAIL_BOARD:
    return {
      ...state,
      board: payload,
      boardsLoading: false
    }

  case 'SET_LOADING':
    return {
      ...state,
      boardsLoading: action.payload
    }
  }
}
