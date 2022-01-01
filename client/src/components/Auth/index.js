import { AuthContext } from 'contexts/AuthContext'
import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import './style.scss'
import RegisterForm from './RegisterForm'
import { Spinner } from 'react-bootstrap'

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated, user }
  } = useContext(AuthContext)

  let body

  if (authLoading) {
    body = (
      <div>
        <Spinner animation='border' variant='info' style={{
          position: 'fixed',
          top: '45%',
          left: '50%'
        }}/>
      </div>
    )
  } else if (isAuthenticated && user) return <Redirect to={`${user.username}/boards`} />
  else
    body = (
      <>
        { authRoute === 'login' && <LoginForm /> }
        { authRoute === 'register' && <RegisterForm /> }
      </>
    )

  return (
    <div className='auth-page'>
      { body }
    </div>
  )
}

export default Auth
