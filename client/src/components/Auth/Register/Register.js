import 'antd/dist/antd.css'
import { Button, Card, Form, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner, Toast } from 'react-bootstrap'
import './Register.scss'
import { AuthContext } from 'contexts/AuthContext'

function Register() {
  // Context
  const {
    registerUser,
    showToast: { show, message, type },
    setShowToast
  } = useContext(AuthContext)

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onFinish = async (values) => {
    setButtonDisabled(true)
    setTimeout(() => {
      setButtonDisabled(false)
    }, 2000)
    const registerData = await registerUser(values)
    setShowToast({
      show: true,
      message: registerData.message,
      type: registerData.success ? 'success' : 'danger'
    })
  }

  return (
    <>
      <div className='register-page'>
        <Card
          className='register-card'
          title='Đăng nhập vào Trello'
        >
          <Form
            onFinish={onFinish}
          >
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Username is required' }
              ]}
            >
              <Input placeholder='Enter your username'/>
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Password is required' }
              ]}
            >
              <Input.Password
                placeholder='Enter your password'
              />
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              disabled={buttonDisabled}
            >
              <span>Submit</span>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{
                  marginLeft: '5px'
                }}
              />
            </Button>
          </Form>
        </Card>
      </div>
      <Toast
        show={show}
        className={`bg-${type} text-white`}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          width: '250px'
        }}
        onClose={setShowToast.bind(this, {
          show: false,
          message: message
        })}
        autohide
        delay={2000}
      >
        <Toast.Header>
          <strong className='mr-auto'>Trello</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </>
  )
}

export default Register
