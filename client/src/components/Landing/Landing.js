import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import landing_1 from '../../assets/img/landing/landing_1.png'
import './Landing.scss'

function Landing() {
  return (
    <div className='landing'>
      <div className='landing-top-image'>
        <img src={landing_1} />
      </div>
      <div className='auth-actions'>
        <Link to='/login'>
          <Button className='login-btn'>
            Login
          </Button>
        </Link>
        <Link to='/register'>
          <Button>
            Signup
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
