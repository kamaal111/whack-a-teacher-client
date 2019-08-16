import React from 'react';
import GameStatistics from '../GameStatistics';
import Header from '../Header'

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
  deleteLobby
}) {
  // One player in game
  if (lobbyLength === 1) {
    return (
      <div id="game-interface">
        <div className="top-div">
          <p onClick={backToLobby}>Back to lobby</p>
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
          <div className='waiting-loader'></div>
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
          <div id="battlefield">
            <p className='instructions'>Whack the teachers as soon as they appear!</p>
            <p className='countdown'>{state.countDown}</p>
          </div>
          <div className="statistics">
            <GameStatistics player={'Your opponent'} />
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
          <div id="battlefield"><p className='game-countdown'>{state.gameDuration}</p>{state.moles}</div>
          <div className="statistics">
            <GameStatistics player={'Your opponent'} />
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
        <div>
          <Header />
          <div id="game-interface">
            <div className="final-result">
              <p>Your score: {playerScore}</p>
              <p>Your opponent's score: {opponentScore}</p>

              <div>
                <p class="italic">
                  Back to lobby in {state.countDownLobby} seconds
                </p>
              </div>
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
