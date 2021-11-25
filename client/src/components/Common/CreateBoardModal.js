import { Button, Form, Input, Modal } from 'antd'
import { AuthContext } from 'contexts/AuthContext'
import { BoardContext } from 'contexts/BoardContext'
import React, { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { initialColors, initialImages } from 'utilities/constants'
import { sleep } from 'utilities/sleep'
import './Common.scss'

function CreateBoardModal(props) {
  const images = initialImages
  const colors = initialColors

  const {
    createNewBoard
  } = useContext(BoardContext)

  const {
    authState: user
  } = useContext(AuthContext)

  const history = useHistory()

  const [backgroundImageInput, setBackgroundImageInput] = useState(images[0])
  const [backgroundColorInput, setBackgroundColorInput] = useState(null)
  const { visible, handleOk, handleCancel } = props

  const [toggleButton, setToggleButton] = useState(true)
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [spin, setSpin] = useState(false)

  const handleSetBackgroundInput = (data, type) => {
    if (type == 'color') {
      setBackgroundColorInput(data)
      setBackgroundImageInput(null)
    } else {
      setBackgroundImageInput(data)
      setBackgroundColorInput(null)
    }
  }

  const handleTitleChange = (e) => {
    if (e.target.value) {
      setToggleButton(false)
      setNewBoardTitle(e.target.value)
    }
    else {
      setToggleButton(true)
      setNewBoardTitle('')
    }
    // console.log(e.target.value?.e)
  }

  const addNewBoard = async () => {
    if (newBoardTitle) {
      let background = {
        type: backgroundImageInput ? 'image' : 'color',
        content: backgroundImageInput ? backgroundImageInput : backgroundColorInput
      }
      setToggleButton(true)
      setSpin(true)
      await sleep(1000)
      const newBoard = {
        title: newBoardTitle.trim(),
        userId: user.user._id,
        background
      }
      const response = await createNewBoard(newBoard)
      if (response.success) {
        history.push('./../board/' + response.newBoard._id)
      }
    }
    return
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
        <Form
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
          <Form.Item
            name='title'
          >
            <Input
              className='input-create-board'
              placeholder='Add board title'
              autoFocus={true}
              onChange={handleTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewBoard()}
            />
          </Form.Item>
        </Form>
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
        <Button
          type='primary'
          style={{ marginTop: '8px' }}
          disabled={toggleButton}
          onClick={addNewBoard}
        >
          Create board
          {spin &&
            <Spinner animation='border' size='sm' style={{ marginLeft: '10px' }} />
          }
        </Button>
      </div>
    </Modal>
  )
}

export default CreateBoardModal
