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

  return (
    <div>
      <AppBar />
      <BoardBar />
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      {visible &&
        <CreateBoardModal
          visible={visible}
          handleCancel={() => setVisible(false)}
        />
      }
    </div>
  )
}

export default Homepage
