import { AuthContext } from 'contexts/AuthContext'
import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import './Auth.scss'
import RegisterForm from './RegisterForm'
import { Spinner } from 'react-bootstrap'

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated }
  } = useContext(AuthContext)

  console.log(isAuthenticated);
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
  } else if (isAuthenticated) return <Redirect to='/board' />
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
