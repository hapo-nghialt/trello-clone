import { Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { UserContext } from 'contexts/UserContext'
import React, { useContext } from 'react'
import './SearchContent.scss'

export default function SearchContent(props) {
  const { keyword, onActionAddMember } = props

  const {
    userState: {
      users
    }
  } = useContext(UserContext)

  const handleAddMember = (user) => {
    onActionAddMember(user)
  }

  return (
    <Card className='search-content'>
      {(users.length > 0 && keyword.length >= 3) ? users.map((user, index) => (
        <div key={index}>
          <div className='search-item' onClick={() => handleAddMember(user)}>
            <Avatar className='avatar' size='default'>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <div className='info-user'>
              <span>{user.username}</span>
              <span className='email'>{user.email}</span>
            </div>
          </div>
        </div>
      )) :
        <div className='empty-text'>
          No result!
        </div>}
    </Card>
  )
}
