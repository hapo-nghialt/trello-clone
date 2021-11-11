import './App.scss'
import React from 'react'
import Register from 'components/Register/Register'
import BoardDetail from 'components/BoardDetail/BoardDetail'
// import Login from 'components/Login/Login'

function App() {
  return (
    <div>
      <BoardDetail />
      {/* <Login /> */}
      <Register />
    </div>
  )
}

export default App
