import axios from 'axios'
import React, { createContext, useReducer, useState } from 'react'
import { authReducer } from 'reducer/authReducer'
import { API_ROOT } from 'utilities/constants'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  // State
  // const [ authState, dispatch ] = useReducer(authReducer, initialState, init)

  const [ showToast, setShowToast ] = useState({
    show: false,
    message: '',
    type: null
  })
  
  // Register user
  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/register`, data)
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
