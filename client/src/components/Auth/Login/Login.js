import { login } from 'actions/Api'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import './Login.scss'

const onFinish = async (values) => {
  try {
    const loginData = await login(values)
    console.log(loginData)
  } catch (error) {
    console.log(error)
  }
}

function Login() {
  return (
    <Form
      name="basic"
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 16
      }}
      className="pt-4"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          },
          {
            min: 3,
            max: 20,
            message: 'Username between 3 and 20 characters!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password
          placeholder="Enter your password"
        />
      </Form.Item>
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default Login
