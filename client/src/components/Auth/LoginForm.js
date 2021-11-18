import React, { useContext } from 'react'
import { Card, Form, Input, Button, Divider } from 'antd'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'

function LoginForm() {
  const {
    login
  } = useContext(AuthContext)

  const onFinish = async (values) => {
    try {
      const loginData = await login(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card
        className='auth-card'
        title='Log in'
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
            <Input
              placeholder='Enter your username'
              style={{ height: '44px' }}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Password is required' }
            ]}
          >
            <Input.Password
              placeholder='Enter your password'
              style={{
                paddingTop: '0',
                paddingBottom: '0',
                height: '42px'
              }}
            />
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='auth-button'
            // disabled={buttonDisabled}
          >
            <span>Log in</span>
            {/* <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{
                marginLeft: '5px'
              }}
            /> */}
          </Button>
          <Divider />
          <Link to='/register' style={{ display: 'block' }}>Sign up for an account </Link>
        </Form>
      </Card>
      {/* <Toast
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
      </Toast> */}
    </>
  )
}

export default LoginForm
