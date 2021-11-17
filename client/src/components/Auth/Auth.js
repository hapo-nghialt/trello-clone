import { AuthContext } from 'contexts/AuthContext'
import React, { useContext } from 'react'

function Auth() {
  const {
    authState: { authLoading, isAuthenticated }
  } = useContext(AuthContext)

  let body

  // if (authLoading)

  return (
    <div className='auth-page'>
      
    </div>
  )
}

export default Auth
