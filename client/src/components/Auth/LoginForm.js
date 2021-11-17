import React from 'react'
import { login } from 'actions/Api'
import { Card, Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'

function LoginForm() {
  const onFinish = async (values) => {
    try {
      const loginData = await login(values)
      console.log(loginData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card
        className='register-card'
        title='Login'
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
            // disabled={buttonDisabled}
          >
            <span>Submit</span>
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
