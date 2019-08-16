import React from 'react';
import GameStatistics from '../GameStatistics';

import './GameInterface.css';

export default function GameInterface({
  lobbyLength,
  backToLobby,
  name,
  state,
  startGame,
  countDownFunction,
  stopGame,
  countDownLobbyFunction,
  playerScore,
  opponentScore,
  deleteLobby,
  opponentName
}) {
  // One player in game
  if (lobbyLength === 1) {
    return (
      <div id="game-interface">
        <div className="button-div">
          <button onClick={backToLobby}>Back to lobby</button>
        </div>
        <div className="statistics">
          <GameStatistics
            // player={this.props.users.activeUser.name}
            player={name}
            score={state.score}
          />
        </div>
        <div id="battlefield" />
        <div className="statistics">
          <p>Waiting for another player to join...</p>
        </div>
      </div>
    );
  }

  // Two players in game
  if (lobbyLength === 2) {
    // Display countdown before game
    while (state.countDown > 0 && !state.gameOver) {
      countDownFunction();

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics
              // player={this.props.users.activeUser.name}
              player={name}
              score={state.score}
            />
          </div>
          <div id="battlefield">{state.countDown}</div>
          <div className="statistics">
            <GameStatistics player={opponentName} />
          </div>
        </div>
      );
    }

    // Start game
    if (state.countDown === 0 && state.gameDuration > 0) {
      if (!state.gameStarted) {
        startGame();
        state.gameStarted = true;
      }

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics
              // player={this.props.users.activeUser.name}
              player={name}
              score={state.score}
            />
          </div>
          <div id="battlefield">{state.moles}</div>
          <div className="statistics">
            <GameStatistics player={opponentName} />
          </div>
        </div>
      );
    }

    // Game over --> display results
    if (state.gameDuration <= 0 && !state.returnToLobby) {
      if (!state.scoresSent) {
        stopGame();
      }

      if (state.countDownLobby === 0) {
        state.returnToLobby = true;
      }

      countDownLobbyFunction();

      return (
        <div id="game-interface">
          <div className="final-result">
            <p>Your score: {playerScore}</p>
            <p>
              {opponentName} score: {opponentScore}
            </p>

            <div>
              <p class="italic">
                Back to lobby in {state.countDownLobby} seconds
              </p>
            </div>
          </div>
        </div>
      );
    }

    deleteLobby();

    return null;
  } else {
    return null;
  }
}
