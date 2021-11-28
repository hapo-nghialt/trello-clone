import React, { useState } from 'react'
import { Modal } from 'antd'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

export default function CardDetail(props) {
  const { showDetailCard, card, onAction } = props

  return (
    <div>
      <Modal
        visible={showDetailCard}
        onOk={() => onAction(MODAL_ACTION_CONFIRM)}
        onCancel={() => onAction(MODAL_ACTION_CLOSE)}
      >
        <p>{card.title}</p>
      </Modal>
    </div>
  )
}
