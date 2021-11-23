import React from 'react'
import { useParams } from 'react-router'

function Homepage() {
  const { id } = useParams()
  console.log(id)
  return (
    <div>
      {id}
    </div>
  )
}

export default Homepage
