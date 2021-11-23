import { Modal } from 'antd'
import React from 'react'
import './Common.scss'

function CreateBoardModal(props) {
  const { visible, handleOk, handleCancel } = props
  return (
    <Modal className='create-board-modal' visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <div>
        <input placeholder='Add board title' />
      </div>
      <ul>

      </ul>
    </Modal>
  )
}

export default CreateBoardModal
