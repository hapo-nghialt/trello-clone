import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [ showToast, setShowToast ] = useState({
    show: false,
    message: '',
    type: null
  })

  const authContextData = {
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
