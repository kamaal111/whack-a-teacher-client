import React from 'react';

export default function WinConditionButton({
  handleOnclick,
  winOrLose,
  opponentScore,
  playerScore,
  opponentsName
}) {
  return (
    <div>
      <h1>{winOrLose}</h1>
      <h1>YOU SCORED {playerScore}</h1>
      <h1>
        {opponentsName} SCORED {opponentScore}
      </h1>
      <button onClick={handleOnclick}>REMATCH</button>
    </div>
  );
}
