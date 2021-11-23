import { Modal } from 'antd'
import React from 'react'
import './Common.scss'

function CreateBoardModal(props) {
  const { visible, handleOk, handleCancel } = props

  const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'black', 'gray', 'brown', 'pink']

  return (
    <Modal className='create-board-modal' visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <div>
        <input placeholder='Add board title' />
      </div>
      <ul className='list-button'>
        {colors.map((color, id) => <li key={id} style={{ backgroundColor: color }}></li>)}
      </ul>
    </Modal>
  )
}

export default CreateBoardModal
