import React, { useContext } from 'react'
import { Avatar, Dropdown, Menu } from 'antd'

import { AuthContext } from 'contexts/AuthContext'
import './AppBar.scss'
import { Link } from 'react-router-dom'

export default function AppBar() {
  const {
    logout,
    authState: {
      user
    }
  } = useContext(AuthContext)

  const menu = (
    <Menu>
      <Menu.Divider />
      <Menu.Item key='1' onClick={logout}>
        <span>Log out</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <nav className='navbar-app'>
      <Link to='/home'>Home</Link>
      <div style={{
        paddingRight: '10px'
      }}>
        <Dropdown overlay={menu}>
          <Avatar
            style={{
              verticalAlign: 'middle',
              backgroundColor: '#f56a00',
              cursor: 'pointer'
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
        </Dropdown>
      </div>
    </nav>
  )
}