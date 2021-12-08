import CardDetail from 'components/CardDetail/CardDetail'
import React, { useState } from 'react'
import { JustifyLeft } from 'react-bootstrap-icons'
import './Card.scss'

export default function Card(props) {
  const { card, column } = props

  const [showDetailCard, setShowDetailCard] = useState(false)

  const onActionCardDetail = () => {
    setShowDetailCard(false)
  }

  const showCard = () => {
    setShowDetailCard(true)
  }

  return (
    <>
      <div
        className="card-item"
        onClick={showCard}
      >
        {card.cover && <img src={card.cover} className="card-cover" alt="" draggable="false"/>}
        {card.title}
        {card.description &&
        <>
          <br/>
          <JustifyLeft />
        </>
        }
      </div>
      <CardDetail showDetailCard={showDetailCard} card={card} onAction={onActionCardDetail} column={column}/>
    </>
  )
}
