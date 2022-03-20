import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import { userReducer } from 'reducer/userReducer'
import { API_ROOT } from 'utilities/constants'
import { SEARCH_USERS } from './constants'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    users: [],
    usersLoading: true
  })

  const searchUser = async (search, userIds) => {
    try {
      const response = await axios.get(`${API_ROOT}/users`, {
        params: {
          keyword: search.trim(),
          userIds
        }
      })
      dispatch({
        type: SEARCH_USERS,
        payload: response.data.users
      })
    } catch (error) {
      if (error.response.data) return error.response.data
    }
  }

  const userContextData = {
    searchUser,
    userState
  }

  return (
    <UserContext.Provider value={ userContextData }>
      { children }
    </UserContext.Provider>
  )
}

export default UserContextProvider
