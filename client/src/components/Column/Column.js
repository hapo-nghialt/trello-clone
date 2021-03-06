import Card from '../Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import React, { useEffect, useRef, useState } from 'react'
import './Column.scss'

import { Container, Draggable } from 'react-smooth-dnd'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { saveContentAfterPressEnter, selectAllInlineText } from 'utilities/contentEditable'

import { cloneDeep } from 'lodash'
import { createNewCard, updateColumn } from 'actions/Api'
import { PlusOutlined } from '@ant-design/icons'

export default function Column(props) {
  const { column, onCardDrop, onUpdateColumnState } = props

  const cards = column.cardOrder

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => {setColumnTitle(e.target.value)}

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
    setNewCardTitle('')
  }

  const newCardTextareaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
  }, [openNewCardForm])

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  // Remove column
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ... column,
        _destroy: true
      }

      // remove column
      updateColumn(newColumn._id, newColumn)
      onUpdateColumnState(newColumn)
    }

    toggleShowConfirmModal()
  }

  // Update column title
  const handleColumnTitleBlur = () => {
    if (columnTitle !== column.title && columnTitle !== '') {

      const newColumn = {
        ... column,
        title: columnTitle
      }

      // call API update column
      updateColumn(newColumn._id, newColumn)
      onUpdateColumnState(newColumn)
    } else if (columnTitle === '') {
      setColumnTitle(column.title)
    }
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }

    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim()
    }

    createNewCard(newCardToAdd).then(card => {
      let newColumn = cloneDeep(column)
      newColumn.cardOrder.push(card)

      setNewCardTitle('')
      newCardTextareaRef.current.focus()

      onUpdateColumnState(newColumn)
      toggleOpenNewCardForm()
    })
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Enter column title..."
            className="content-editable"
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Header>List actions</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={toggleOpenNewCardForm}>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item>Move all cards in this column...</Dropdown.Item>
              <Dropdown.Item>Archive all cards in this column...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={dropResult => onCardDrop(column._id, dropResult)}
          getChildPayload={ index => cards[index] }
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index} >
              <Card
                card={card}
                column = {column}
              />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm &&
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card..."
              className="textarea-enter-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            />
          </div>
        }
      </div>
      <footer>
        {openNewCardForm &&
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>Add card</Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}><i className="fa fa-times icon" /></span>
          </div>
        }
        {!openNewCardForm &&
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <PlusOutlined
              style={{
                marginRight: '5px',
                fontSize: '13px'
              }}
            /> Add another card
          </div>
        }
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure to remove <strong>${column.title}</strong>?<br />All related cards will also be removed!`}
      />
    </div>
  )
}
