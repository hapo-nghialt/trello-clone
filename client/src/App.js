import './App.scss'
import React from 'react'
import AppBar from 'components/BoardDetail/AppBar/AppBar'
import BoardBar from 'components/BoardDetail/BoardBar/BoardBar'
import BoardContent from 'components/BoardDetail/BoardContent/BoardContent'
import Login from 'components/Auth/Login/Login'

function App() {
  return (
    <div className="trello-web">
      {/* <AppBar />
      <BoardBar />
      <BoardContent /> */}
      <Login />
    </div>
  )
}

export default App
