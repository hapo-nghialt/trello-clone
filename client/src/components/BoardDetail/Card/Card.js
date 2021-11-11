import React from 'react'
import './Card.scss'

export default function Card(props) {
  const { card } = props

  const showCardInfo = () => {
  }

  return (
    <div className="card-item" onClick={showCardInfo}>
      {card.cover && <img src={card.cover} className="card-cover" alt="" draggable="false"/>}
      {card.title}
    </div>
  )
}
