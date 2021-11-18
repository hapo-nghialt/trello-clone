import 'antd/dist/antd.css'
import { Button, Card, Divider, Form, Input, Upload } from 'antd'
import React, { useContext, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { AuthContext } from 'contexts/AuthContext'
import { Link } from 'react-router-dom'
import ImgCrop from 'antd-img-crop'

function RegisterForm() {
  // Context
  const {
    register,
    showToast: { show, message, type },
    setShowToast
  } = useContext(AuthContext)

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onFinish = async (data) => {
    setButtonDisabled(true)
    setTimeout(() => {
      setButtonDisabled(false)
    }, 2000)
    const registerData = await register(data)
    setShowToast({
      show: true,
      message: registerData.message,
      type: registerData.success ? 'success' : 'danger'
    })
  }

  return (
    <>
      <Card
        className='auth-card'
        title='Register'
      >
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            rules={[
              { required: true, message: 'Username is required' },
              { min: 8, max: 20, message: 'Username between 8 and 20 characters' }
            ]}
            hasFeedback
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
          {/* <ImgCrop rotate>
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop> */}
          <Button
            type='primary'
            htmlType='submit'
            disabled={buttonDisabled}
            className='auth-button'
          >
            <span>Continue</span>
          </Button>
          <Divider />
          <Link to='/login' style={{ display: 'block' }}>Already have an account? Log In</Link>
        </Form>
      </Card>
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

export default RegisterForm
