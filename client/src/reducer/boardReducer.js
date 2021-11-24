import { CREATE_BOARD } from 'contexts/constants';

export const boardReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
  case CREATE_BOARD:
    return {
      ...state,
      boards: [...state.boards, payload]
    }
  }
}
