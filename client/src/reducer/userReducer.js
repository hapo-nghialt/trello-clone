import { SEARCH_USERS } from 'contexts/constants'

export const userReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
  case SEARCH_USERS:
    return {
      ...state,
      users: payload,
      usersLoading: false
    }

  default:
    return state
  }
}
