import { fetchBoard } from 'actions/Api'
import React from 'react'
import './AppBar.scss'

export default function AppBar() {
  const onClick = () => {
    fetchBoard()
  }

  return <>
    <nav className="navbar-app">App bar</nav>
    <button onClick={onClick}>Add</button>
  </>
}
