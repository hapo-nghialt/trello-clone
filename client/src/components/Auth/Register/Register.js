import { register } from 'actions/Api'
import 'antd/dist/antd.css'
import { Button, Card, Form, Input } from 'antd'
import React, { useContext } from 'react'
import { Spinner, Toast } from 'react-bootstrap'
import './Register.scss'
import { AuthContext } from 'contexts/AuthContext'

function Register() {
  const {
    showToast: { show, message, type },
    setShowToast
  } = useContext(AuthContext)

  const onFinish = async (values) => {
    const registerData = await register(values)
    if (registerData.errors) {
      setShowToast({
        show: true,
        message: registerData.errors[0].msg,
        type: 'danger'
      })
    }
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
            >
              <Input placeholder='Enter your username'/>
            </Form.Item>
            <Form.Item
              name='password'
            >
              <Input.Password
                placeholder='Enter your password'
              />
            </Form.Item>
            <Button type='primary' htmlType='submit'>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Submit
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
          right: '10px'
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
