import { Form, Input } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'

function Login() {
  return (
    <Form
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 16
      }}
      className='pt-4'
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default Login
