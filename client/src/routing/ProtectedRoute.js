import { AuthContext } from 'contexts/AuthContext'
import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated }
  } = useContext(AuthContext)

  if (authLoading)
    return (
      <div>
        <Spinner animation="border" variant="info" style={{
          position: 'fixed',
          top: '45%',
          left: '50%'
        }}/>
      </div>
    )

  return (
    <Route
      { ...rest }
      render={(props) =>
        isAuthenticated ? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

export default ProtectedRoute
