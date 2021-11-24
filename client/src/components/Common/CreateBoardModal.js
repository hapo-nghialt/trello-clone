import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import './Common.scss'

function CreateBoardModal(props) {
  const [backgroundColorInput, setBackgroundColorInput] = useState('')
  const [backgroundImageInput, setBackgroundImageInput] = useState(
    'https://images.unsplash.com/photo-1637684990963-366531ce088a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  )
  const { visible, handleOk, handleCancel } = props

  const images = [
    'https://images.unsplash.com/photo-1637684990963-366531ce088a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1637423086319-892cc1c3526b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1637345540120-38bb0bbb7871?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1595&q=80',
    'https://images.unsplash.com/photo-1637479758719-a8f1241435e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1111&q=80'
  ]

  const colors = [
    'rgb(0, 121, 191)',
    'rgb(210, 144, 52)',
    'rgb(81, 152, 57)',
    'rgb(176, 70, 50)',
    'rgb(137, 96, 158)'
  ]

  const [toggleButton, setToggleButton] = useState(true)

  const handleSetBackgroundInput = (data, type) => {
    if (type == 'color') {
      setBackgroundColorInput(data)
      setBackgroundImageInput('')
    } else {
      setBackgroundImageInput(data)
      setBackgroundColorInput('')
    }
  }

  const handleTitleChange = (e) => {
    if (e.target.value) {
      setToggleButton(false)
    }
    else {
      setToggleButton(true)
    }
  }

  return (
    <Modal
      className='create-board-modal'
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: '296px',
            height: '96px',
            borderRadius: '5px',
            padding: '10px',
            backgroundImage: 'url("' + backgroundImageInput + '")',
            backgroundColor: backgroundColorInput,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        >
          <Form.Item>
            <Input
              className='input-create-board'
              placeholder='Add board title'
              autoFocus={true}
              onChange={handleTitleChange}
            />
          </Form.Item>
        </div>
        <ul className='list-button'>
          {images.map((image, id) => (
            <li
              key={id}
              style={{
                backgroundImage: 'url("' + image + '")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}
              onClick={() => handleSetBackgroundInput(image, 'image')}
            ></li>
          ))}
          {colors.map((color, id) => (
            <li
              key={id}
              style={{ backgroundColor: color }}
              onClick={() => handleSetBackgroundInput(color, 'color')}
            ></li>
          ))}
        </ul>
      </div>
      <div>
        <Button type='primary' style={{ marginTop: '8px' }} disabled={toggleButton}>
          Create board
        </Button>
      </div>
    </Modal>
  )
}

export default CreateBoardModal
