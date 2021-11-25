import { CREATE_BOARD, GET_ALL_BOARDS } from 'contexts/constants';

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
  }
}
