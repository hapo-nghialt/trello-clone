import { Button } from 'antd'
import AppBar from 'components/AppBar/AppBar'
import CreateBoardModal from 'components/Common/CreateBoardModal'
import { BoardContext } from 'contexts/BoardContext'
import React, { useContext, useEffect, useState } from 'react'
import { Bookmarks } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import './style.scss'

function Homepage() {
  const [visible, setVisible] = useState(false)

  const {
    getAllBoards,
    boardState: { boards }
  } = useContext(BoardContext)

  // Start: Get all boards
  useEffect(() => {
    getAllBoards()
  }, [])

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#fafbfc'
    }}>
      <AppBar />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flex: '1 1 0%',
        position: 'relative',
        overflowY: 'auto',
        justifyContent: 'center'
      }}>
        <div className='main-homepage'>
          <div className='your-boards'>
            <div className='boards-page-header-name'>
              <Bookmarks />
              <h3>Your workspaces</h3>
            </div>
            <div>
              <ul className='board-section-list'>
                {boards.map((board, index) => (
                  <li key={index} className='board-section-list-item'>
                    <Link
                      to={`../../board/${board._id}`}
                      className='board-title'
                      style={{
                        backgroundColor: board.background.type == 'color' && board.background.content,
                        backgroundImage: board.background.type == 'image' && 'url("' + board.background.content + '")'
                      }}
                    >
                      <span className='board-title-fade'></span>
                      <div className='board-details-name'>{board.title}</div>
                    </Link>
                  </li>
                ))}
                <li className='board-section-list-item'>
                  <Button
                    type='primary'
                    onClick={() => setVisible(true)}
                    className='board-title create-new-board'
                    style={{
                      width: '100%'
                    }}
                  >
                    Create new board
                  </Button>
                </li>
              </ul>
            </div>
            {/*  */}
          </div>
          {visible &&
            <CreateBoardModal
              visible={visible}
              handleCancel={() => setVisible(false)}
            />
          }
        </div>
      </div>

    </div>
  )
}

export default Homepage
