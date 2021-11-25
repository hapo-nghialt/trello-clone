import { Button } from 'antd'
import AppBar from 'components/AppBar/AppBar'
import BoardBar from 'components/BoardBar/BoardBar'
import CreateBoardModal from 'components/Common/CreateBoardModal'
import { BoardContext } from 'contexts/BoardContext'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

function Homepage() {
  const [visible, setVisible] = useState(false)

  const {
    getAllBoards,
    boardState: { boards, boardsLoading }
  } = useContext(BoardContext)

  // Start: Get all boards
  useEffect(() => {
    getAllBoards()
  }, [])

  let body

  if (boardsLoading) {
    body = (
      <div>
        <Spinner animation='border' variant='info' style={{
          position: 'fixed',
          top: '45%',
          left: '50%'
        }}/>
      </div>
    )
  } else {
    body = (
      <Button type="primary" onClick={() => setVisible(true)}>
        Create new board
      </Button>
    )
  }

  return (
    <div>
      <AppBar />
      <BoardBar />
      {body}
      {boards.map((board, index) => (
        <div key={index}>
          {board.title}
        </div>
      ))}
      {visible &&
        <CreateBoardModal
          visible={visible}
          handleCancel={() => setVisible(false)}
        />
      }
    </div>
  )
}

export default Homepage
