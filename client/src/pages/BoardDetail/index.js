import { BoardContext } from 'contexts/BoardContext'
import React, { useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from '../../components/BoardBar/BoardBar'
import BoardContent from '../../components/BoardContent/BoardContent'
import { useHistory } from 'react-router'

function BoardDetail() {
  const { id } = useParams()

  const {
    getBoardDetail,
    boardState: { board, boardsLoading }
  } = useContext(BoardContext)

  const history = useHistory()

  useEffect(() => {
    getBoardDetail(id).then(response => {
      if (response.success == false && response.private == true) {
        history.push('/private')
      }
    })
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
  } else if (board) {
    let background = board.background

    body = (
      <div
        className='trello-web'
        style={{
          backgroundColor: background.type == 'color' && background.content,
          backgroundImage: background.type == 'image' && 'url("' + background.content + '")'
        }}
      >
        <AppBar />
        <BoardBar />
        <BoardContent boardProps={board}/>
      </div>
    )
  }

  return (
    <>
      { body }
    </>
  )
}

export default BoardDetail
