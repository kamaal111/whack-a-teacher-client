import React from 'react'

export default function GameStatistics(props) {
  if (props.player && props.score) {
    return(
      <div>
        <p>{props.player}</p>
        <p>Score: {props.score}</p>
      </div>
    )
  } else {
    return(
      <div>
        <p>{props.player}</p>
      </div>
    )
  }
}