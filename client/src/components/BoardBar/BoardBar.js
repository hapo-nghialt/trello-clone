import React, { useContext, useState } from 'react'
import { Button, Input, Popover } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import './BoardBar.scss'
import { UserContext } from 'contexts/UserContext'
import SearchContent from './SearchContent/SearchContent'

export default function BoardBar() {
  const [search, setSearch] = useState('')
  const [searchContent, setSearchContent] = useState('')

  const {
    searchUser
  } = useContext(UserContext)

  const handleChange = (e) => {
    const keyword = e.target.value
    setSearch(keyword)
    searchUser(keyword)

    if (keyword.trim() !== '') {
      setSearchContent(<SearchContent keyword={keyword} />)
    } else {
      setSearchContent('')
    }
  }

  const handleBlur = (e) => {
    if (e == false) {
      setSearch('')
      setSearchContent('')
    }
  }

  const text = <span>Invite to board</span>
  const content = (
    <>
      <Input
        placeholder='Email address or name'
        value={search}
        onChange={handleChange}
      />
      { searchContent }
    </>
  )

  return (
    <nav className='navbar-board'>
      <Popover placement='bottomLeft' onVisibleChange={(e) => handleBlur(e)} title={text} content={content} trigger='click' overlayClassName='invite-popover'>
        <Button className='invite-btn'><UserAddOutlined />Invite</Button>
      </Popover>
    </nav>
  )
}
