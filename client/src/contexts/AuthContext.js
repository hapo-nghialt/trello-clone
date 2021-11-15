import { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false)
}

export default AuthContextProvider
