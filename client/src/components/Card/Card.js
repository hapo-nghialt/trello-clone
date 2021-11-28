import CardDetail from 'components/CardDetail/CardDetail'
import React, { useState } from 'react'
import './Card.scss'

export default function Card(props) {
  const { card } = props

  const [showDetailCard, setShowDetailCard] = useState(false)

  const onActionCardDetail = (type) => {
    console.log(type)
  }

  return (
    <>
      <div
        className="card-item"
        onClick={() => setShowDetailCard(true)}
      >
        {card.cover && <img src={card.cover} className="card-cover" alt="" draggable="false"/>}
        {card.title}
      </div>
      <CardDetail showDetailCard={showDetailCard} card={card} onAction={onActionCardDetail}/>
    </>
  )
}
