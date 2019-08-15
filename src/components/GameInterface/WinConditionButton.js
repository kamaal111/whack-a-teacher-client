import React from 'react';

export default function WinConditionButton({ handleOnclick, winOrLose }) {
  return (
    <div>
      <h1>{winOrLose}</h1>
      <button onClick={handleOnclick}>REMATCH</button>
    </div>
  );
}
