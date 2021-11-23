export const authReducer = (state, action) => {
  // const {
  //   type,
  //   payload: { isAuthenticated, user }
  // } = action

  switch (action.type) {
  case 'SET_LOADING':
    return {
      ...state,
      authLoading: action.payload
    }

  case 'SET_AUTH':
    return {
      ...state,
      authLoading: false,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user
    }

  default:
    return state
  }
}
