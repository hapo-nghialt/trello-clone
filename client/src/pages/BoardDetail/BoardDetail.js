import { BoardContext } from 'contexts/BoardContext'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from '../../components/BoardBar/BoardBar'
import BoardContent from '../../components/BoardContent/BoardContent'

function BoardDetail() {
  const { id } = useParams()

  const {
    getBoardDetail,
    boardState: { board }
  } = useContext(BoardContext)

  const background = board ? board.background : null

  useEffect(() => {
    getBoardDetail(id)
  }, [])
  return (
    <div
      className='trello-web'
      style={{
        backgroundColor: background && background.type == 'color' && background.content,
        backgroundImage: background && background.type == 'image' && background.content
      }}
    >
      <AppBar />
      <BoardBar />
      <BoardContent boardId={id}/>
    </div>
  )
}

export default BoardDetail
