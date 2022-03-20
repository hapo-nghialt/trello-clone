import React, { useContext, useState } from 'react'
import { Avatar, Button, Divider, Input, Popover, Tag, Tooltip, Typography } from 'antd'
import { AntDesignOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import './BoardBar.scss'
import { UserContext } from 'contexts/UserContext'
import SearchContent from './SearchContent/SearchContent'
import { BoardContext } from 'contexts/BoardContext'

export default function BoardBar() {
  const [search, setSearch] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [active, setActive] = useState('')
  const [listMember, setListMember] = useState([])

  const {
    searchUser
  } = useContext(UserContext)

  const {
    boardState: {
      board
    },
    updateBoard
  } = useContext(BoardContext)

  const handleChange = (e) => {
    const keyword = e.target.value
    setSearch(keyword)
    let listMemberIds = []
    listMember.forEach(element => {
      listMemberIds.push(element._id)
    })
    if (board.members.length !== 0) {
      board.members.forEach(element => {
        listMemberIds.push(element._id)
      })
    }
    searchUser(keyword, [ ...listMemberIds, board.userId ])

    if (keyword.trim() !== '') {
      setSearchContent(<SearchContent keyword={keyword} onActionAddMember={handleAddMember} />)
    } else {
      setSearchContent('')
    }
  }

  const handleAddMember = (user) => {
    setListMember(listMember => [ ...listMember, user ])
    setSearch('')
    setSearchContent('')
  }

  const handleBlur = (e) => {
    if (e == false) {
      setSearch('')
      setSearchContent('')
      setListMember([])
    }
  }

  const handleUpdateBoard = (listMember) => {
    let newBoard = { ...board }
    newBoard.members = board.members.concat(listMember)
    updateBoard(board._id, newBoard)
  }

  const text = <span>Invite to board</span>
  const content = (
    <>
      <div className={`input-search ${active}`}>
        {listMember.length !== 0 &&
          listMember.map((user, index) => (
            <Tag closable key={index} onClose={() => setListMember(listMember.filter(e => e !== user))}>
              {user.username}
            </Tag>
          ))
        }
        <Input
          placeholder='Email address or name'
          value={search}
          onChange={handleChange}
          onFocus={() => setActive('active')}
          onBlur={() => setActive('')}
        />
      </div>
      { searchContent }
      <Button
        className='send-invitation'
        type='primary'
        disabled={listMember.length === 0}
        onClick={() => handleUpdateBoard(listMember)}
      >Send invitation</Button>
    </>
  )

  return (
    <nav className='navbar-board'>
      <Typography className='title' level={5}>{board.title}</Typography>
      <Divider type='vertical' className='divider' />
      {board.private == true &&
        <>
          <Typography className='private' level={5}>Private Workspace</Typography>
          <Divider type='vertical' className='divider' />
        </>
      }
      {console.log(board.members)}
      <Avatar.Group>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <Avatar
          style={{
            backgroundColor: '#f56a00',
          }}
        >
          K
        </Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{
              backgroundColor: '#87d068'
            }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{
            backgroundColor: '#1890ff',
          }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
      <Divider type='vertical' className='divider' />
      <Popover
        placement='bottomLeft'
        onVisibleChange={(e) => handleBlur(e)}
        title={text}
        content={content}
        trigger='click'
        overlayClassName='invite-popover'
      >
        <Button className='invite-btn'><UserAddOutlined />Invite</Button>
      </Popover>
    </nav>
  )
}
