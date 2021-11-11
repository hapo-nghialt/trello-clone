import React from 'react'
import AppBar from './AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

function BoardDetail() {
  return (
    <div className="trello-web">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  )
}

export default BoardDetail
