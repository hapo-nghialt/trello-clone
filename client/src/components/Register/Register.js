import { register } from 'actions/Api'
import 'antd/dist/antd.css'
import { Button, Form, Input } from 'antd'
import React from 'react'

function Register() {
  const onFinish = async (values) => {
    const registerData = await register(values)
    if (registerData.errors) {
      console.log(registerData.errors[0].msg)
    }
  }

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
          // {
          //   required: true,
          //   message: 'Please input your username!'
          // },
          // {
          //   min: 3,
          //   max: 20,
          //   message: 'Username between 3 and 20 characters!'
          // }
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

export default Register
