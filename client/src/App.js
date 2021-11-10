import './App.scss'
import React from 'react'
// import AppBar from 'components/AppBar/AppBar'
// import BoardBar from 'components/BoardBar/BoardBar'
// import BoardContent from 'components/BoardContent/BoardContent'
import Login from 'components/Login/Login'

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
