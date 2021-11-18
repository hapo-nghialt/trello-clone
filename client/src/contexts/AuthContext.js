import axios from 'axios'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import { authReducer } from 'reducer/authReducer'
import { API_ROOT, LOCAL_STORAGE_TOKEN_NAME } from 'utilities/constants'
import setAuthToken from 'utilities/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  // State
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null
  })

  const [ showToast, setShowToast ] = useState({
    show: false,
    message: '',
    type: null
  })

  // Authenticated user
  const authenticatedUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    }

    try {
      const response = await axios.get(`${API_ROOT}/auth`)
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: response.data.user
          }
        })
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
      setAuthToken(null)
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: false,
          user: null
        }
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true
          }
        })
      } else {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: false
          }
        })
      }
    }, 1000)
  }, [])

  // Login
  const login = async (request) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/login`, request)
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        )
      }

      setTimeout(() => {
        authenticatedUser()
      }, 500)

      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
    }
  }

  // Register user
  const register = async (request) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/register`, request)
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        )
      }

      setTimeout(() => {
        authenticatedUser()
      }, 1000)

      // await authenticatedUser()
      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
    }
  }

  const authContextData = {
    register,
    login,
    showToast,
    setShowToast,
    authState
  }

  return (
    <AuthContext.Provider value={ authContextData }>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
