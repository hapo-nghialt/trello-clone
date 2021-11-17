import axios from 'axios'
import React, { createContext, useReducer, useState } from 'react'
import { authReducer } from 'reducer/authReducer'
import { API_ROOT, LOCAL_STORAGE_TOKEN_NAME } from 'utilities/constants'
import setAuthToken from 'utilities/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  // State
  // const [ authState, dispatch ] = useReducer(authReducer, initialState, init)

  const [ showToast, setShowToast ] = useState({
    show: false,
    message: '',
    type: null
  })

  // Authenticated user
  const authenticatedUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${API_ROOT}/auth`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  // Register user
  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/register`, data)
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        )
      }

      await authenticatedUser()

      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
    }
  }

  const authContextData = {
    registerUser,
    showToast,
    setShowToast
  }

  return (
    <AuthContext.Provider value={ authContextData }>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
