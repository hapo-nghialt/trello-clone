import { register } from 'actions/Api'
import 'antd/dist/antd.css'
import { Button, Card, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'

function Register() {
  const onFinish = async (values) => {
    const registerData = await register(values)
    if (registerData.errors) {
      console.log(registerData.errors[0].msg)
    }
  }

  const [showToast, setShowToast] = useState(false)

  const handleShowToast = () => {
    setShowToast(!showToast)
  }

  return (
    <>
      <Card
        title="Default size card"
        extra={<a href="#">More</a>}
        style={{ maxWidth: 500 }}
      >
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
            <Input placeholder='Enter your username'/>
          </Form.Item>
          <Form.Item
            name="password"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your password!'
            //   }
            // ]}
          >
            <Input.Password
              placeholder="Enter your password"
            />
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form>
        <Button onClick={handleShowToast}>
          Click
        </Button>
        <Toast show={showToast}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you are reading this text in a Toast!</Toast.Body>
        </Toast>
      </Card>
    </>
  )
}

export default Register
