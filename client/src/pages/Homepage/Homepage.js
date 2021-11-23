import { Button } from 'antd'
import AppBar from 'components/AppBar/AppBar'
import BoardBar from 'components/BoardBar/BoardBar'
import CreateBoardModal from 'components/Common/CreateBoardModal'
import { AuthContext } from 'contexts/AuthContext'
import React, { useContext, useState } from 'react'

function Homepage() {
  const {
    authState: { user }
  } = useContext(AuthContext)

  const [visible, setVisible] = useState(false)

  // console.log(user)

  return (
    <div>
      <AppBar />
      <BoardBar />
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <CreateBoardModal visible={visible} />
    </div>
  )
}

export default Homepage
