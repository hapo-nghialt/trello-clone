import React from 'react'
import { useParams } from 'react-router'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from '../../components/BoardBar/BoardBar'
import BoardContent from '../../components/BoardContent/BoardContent'

function BoardDetail() {
  const { id } = useParams()
  return (
    <div className="trello-web">
      <AppBar />
      <BoardBar />
      <BoardContent boardId={id}/>
    </div>
  )
}

export default BoardDetail
