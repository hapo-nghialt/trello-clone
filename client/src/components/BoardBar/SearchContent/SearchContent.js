import { Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { UserContext } from 'contexts/UserContext'
import React, { useContext } from 'react'
import './SearchContent.scss'

export default function SearchContent(props) {
  const { keyword } = props

  const {
    userState: {
      users
    }
  } = useContext(UserContext)

  const handleAddMember = (id) => {
  }

  return (
    <Card className='search-content'>
      {(users.length > 0 && keyword.length >= 3) ? users.map((user, index) => (
        <div key={index}>
          <div className='search-item' onClick={() => handleAddMember(user._id)}>
            <Avatar className='avatar' size='default'>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            {user.username}
          </div>
        </div>
      )) :
        <div className='empty-text'>
          No result!
        </div>}
    </Card>
  )
}
