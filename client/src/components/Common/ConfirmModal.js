import React from 'react'
import { Button, Modal } from 'react-bootstrap'

import HTMLReactParser from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

function ConfirmModal(props) {
  const { title, content, show, onAction } = props

  return (
    <Modal
      show={show}
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button variant="secondary" size="sm" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          Close
        </Button>
        <Button variant="danger" size="sm" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
