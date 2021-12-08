import './CardDetail.scss'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Form } from 'antd'
import { MODAL_ACTION_CLOSE } from 'utilities/constants'
import { JustifyLeft, Window, XLg } from 'react-bootstrap-icons'
import TextareaAutosize from 'react-textarea-autosize'
import { updateCard } from 'actions/Api'

export default function CardDetail(props) {
  const { showDetailCard, card, onAction, column } = props

  const [showTextArea, setShowTextArea] = useState(false)

  const initialDescription = card.description ? card.description : 'Add a more detailed description...'
  const [description, setDescription] = useState(initialDescription)

  const styleWithDes = {
    backgroundColor: '#f4f5f7',
    padding: '0 12px 8px 0',
    marginTop: '10px'
  }
  const styleWithoutDes = {
    backgroundColor: '#091e420a',
    padding: '8px 12px',
    marginTop: '20px'
  }
  const [styleDescription, setStyleDescription] = useState(card.description ? styleWithDes : styleWithoutDes)

  const toggleShowTextArea = () => {
    setShowTextArea(!showTextArea)
  }

  const newDetailCardTextAreaRef = useRef(null)

  useEffect(() => {
    if (newDetailCardTextAreaRef && newDetailCardTextAreaRef.current) {
      newDetailCardTextAreaRef.current.focus()
      newDetailCardTextAreaRef.current.select()
    }
  }, [showTextArea])

  const handleSaveDescription = (data) => {
    toggleShowTextArea()

    let cardDescription = data.description

    if (cardDescription) {
      do {
        cardDescription = cardDescription.replaceAll('\n\n\n', '\n\n')
      } while (cardDescription.indexOf('\n\n\n') !== -1)

      card.description = cardDescription == '' ? null : cardDescription

      setDescription(cardDescription)
      setStyleDescription(styleWithDes)
    } else {
      card.description = null
      setDescription('Add a more detailed description...')
      setStyleDescription(styleWithoutDes)
    }

    updateCard(card._id, card)
  }

  return (
    <div>
      <Modal
        visible={showDetailCard}
        onCancel={() => onAction(MODAL_ACTION_CLOSE)}
        footer={null}
        className='modal-detail-card'
      >
        <div className='detail-card-header'>
          <span className='detail-card-header-icon'><Window /></span>
          <div className='detail-card-title'>{card.title}</div>
          <div className='detail-card-inline'>in list <u>{column.title}</u></div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className='detail-card-main'>
            <span className='detail-card-main-icon'><JustifyLeft /></span>
            <h3 style={{ fontWeight: '700' }}>Description</h3>
            {showTextArea ?
              <>
                <Form onFinish={handleSaveDescription}>
                  <Form.Item
                    name='description'
                    initialValue={card.description ? card.description : ''}
                  >
                    <TextareaAutosize
                      className='description-text-area'
                      rows={3}
                      placeholder='Add a more detailed description...'
                      ref={newDetailCardTextAreaRef}
                    />
                  </Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ marginTop: '5px' }}
                  >Save</Button>
                  <XLg
                    style={{
                      fontSize: '18px',
                      marginLeft: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={toggleShowTextArea}
                  />
                </Form>
              </>
              : <div
                className='active-text-area'
                onClick={toggleShowTextArea}
                style={styleDescription}
              >{description}</div>
            }
          </div>
          <div className='detail-sidebar'>
            <p>Add to card</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
