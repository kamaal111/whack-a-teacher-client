import React from 'react';
import './styles.css'

export default function GameStatistics({ player, score }) {
  if (player && score) {
    return (
      <div>
        <p>{player}</p>
        <p>Score: {score}</p>
      </div>
    );
  }

  return (
    <div>
      <p>{player}</p>
    </div>
  );
}
