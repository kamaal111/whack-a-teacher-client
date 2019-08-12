import React from 'react'

export default function GameStatistics(props) {
  return(
    <div>
      <p>{props.player}</p>
      <p>Score: {props.score}</p>
    </div>
  )
}