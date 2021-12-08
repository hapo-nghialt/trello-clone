import Column from '../Column/Column'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import './BoardContent.scss'

import { applyDrag } from 'utilities/dragDrop'

import { Container, Draggable } from 'react-smooth-dnd'

import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { createNewColumn, updateBoard, updateCard, updateColumn } from 'actions/Api'
import { PlusOutlined } from '@ant-design/icons'

export default function BoardContent(props) {
  const { boardProps } = props

  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const [styleAddColumn, setStyleAddColumn] = useState({
    height: 'auto',
    opacity: '1'
  })
  const [styleEnterColumn, setStyleEnterColumn] = useState({
    height: '0',
    opacity: '0',
    display: 'none'
  })

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)

    if (openNewColumnForm) {
      setStyleAddColumn ({
        height: 'auto',
        opacity: '1',
        transition: 'height 0ms 0ms, opacity 600ms 0ms'
      })
      setStyleEnterColumn({
        height: '0',
        opacity: '0',
        display: 'none'
      })
    } else {
      setStyleAddColumn ({
        height: '0',
        opacity: '0',
        padding: '0'
      })
      setStyleEnterColumn({
        height: 'auto',
        opacity: '1',
        transition: 'height 0ms 0ms, opacity 600ms 0ms'
      })
    }
  }

  const newColumnInputRef = useRef(null)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  useEffect(() => {
    setBoard(boardProps)
    setColumns(boardProps.columnOrder)
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return <div className='board-not-found' style={{ 'padding': '10px', 'color': '#fff' }}>Board not found</div>
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [ ...columns ]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    updateBoard(board._id, newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [ ...columns ]

      let currentColumn = newColumns.find(c => c._id === columnId)
      currentColumn.cardOrder = applyDrag(currentColumn.cardOrder, dropResult)

      if (dropResult.removedIndex == null) {
        const updatedCard = cloneDeep(dropResult.payload)
        updatedCard.columnId = currentColumn._id
        let cardIndex = currentColumn.cardOrder.findIndex(x => x._id == updatedCard._id)

        updateCard(updatedCard._id, updatedCard)
        currentColumn.cardOrder[cardIndex].columnId = currentColumn._id
      }

      setColumns(newColumns)
      updateColumn(currentColumn._id, currentColumn)
    }
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      boardProps: board._id,
      title: newColumnTitle.trim()
    }

    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)

      setNewColumnTitle('')
      toggleOpenNewColumnForm()
    })
  }

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id

    let newColumns = [...columns]
    const indexColumnToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      // remove column
      newColumns.splice(indexColumnToUpdate, 1)
      setColumns(newColumns)
    } else {
      // update column info
      newColumns.splice(indexColumnToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  return (
    <div className='board-content'>
      <Container
        orientation='horizontal'
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector='.column-drag-handle'
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index} >
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState}
            />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className='trello-container'>
        <Row className='form-add-new-column'>
          <Col
            className='add-new-column'
            onClick={toggleOpenNewColumnForm}
            style={styleAddColumn}
          >
            <PlusOutlined
              style={{
                marginRight: '5px',
                fontSize: '13px'
              }}
            /> Add a list
          </Col>
          <Col
            className='enter-new-column'
            style={styleEnterColumn}
          >
            <Form.Control
              size='sm'
              type='text'
              placeholder='Enter column title...'
              className='input-enter-new-column'
              ref={newColumnInputRef}
              value={newColumnTitle}
              onChange={onNewColumnTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
            />
            <Button variant='success' size='sm' onClick={addNewColumn}>Add column</Button>
            <span className='cancel-icon' onClick={toggleOpenNewColumnForm}><i className='fa fa-times icon' /></span>
          </Col>
        </Row>
      </BootstrapContainer>
    </div>
  )
}
