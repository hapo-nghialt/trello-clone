import './App.scss'
import React from 'react'
import Register from 'components/Auth/Register/Register'
import BoardDetail from 'components/BoardDetail/BoardDetail'
import AuthContextProvider from 'contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from 'components/Landing/Landing'
// import Login from 'components/Login/Login'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
