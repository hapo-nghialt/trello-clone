import './CardDetail.scss'
import React, { useState } from 'react'
import { Modal } from 'antd'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { Window } from 'react-bootstrap-icons'

export default function CardDetail(props) {
  const { showDetailCard, card, onAction, columnId } = props

  console.log(columnId)

  return (
    <div>
      <Modal
        visible={showDetailCard}
        onCancel={() => onAction(MODAL_ACTION_CLOSE)}
        footer={null}
        className='modal-detail-card'
      >
        <div className='detail-card-header'>
          <span className='detail-card-header-icon'><Window /></span>
          <div className='detail-card-title'>{card.title}</div>
          <div className='detail-card-inline'>in list </div>
        </div>
      </Modal>
    </div>
  )
}
