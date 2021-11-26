import React from 'react'
import './Card.scss'

export default function Card(props) {
  const { card } = props

  return (
    <div
      className="card-item"
      onClick={() => {
        console.log('1231234')
      }}
    >
      {card.cover && <img src={card.cover} className="card-cover" alt="" draggable="false"/>}
      {card.title}
    </div>
  )
}
