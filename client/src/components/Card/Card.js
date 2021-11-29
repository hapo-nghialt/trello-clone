import CardDetail from 'components/CardDetail/CardDetail'
import React, { useState } from 'react'
import './Card.scss'

export default function Card(props) {
  const { card } = props

  const [showDetailCard, setShowDetailCard] = useState(false)
  const [columnId, setColumnId] = useState(null)

  const onActionCardDetail = () => {
    setShowDetailCard(false)
    setColumnId(null)
  }

  const showCard = () => {
    console.log(card)
    setShowDetailCard(true)
    setColumnId(card.columnId)
  }

  return (
    <>
      <div
        className="card-item"
        onClick={showCard}
      >
        {card.cover && <img src={card.cover} className="card-cover" alt="" draggable="false"/>}
        {card.title}
      </div>
      <CardDetail showDetailCard={showDetailCard} card={card} onAction={onActionCardDetail} columnId={columnId}/>
    </>
  )
}
