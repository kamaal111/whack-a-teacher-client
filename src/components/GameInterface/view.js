import React from 'react';
import GameStatistics from '../GameStatistics';

import './GameInterface.css';

export default function GameInterface(props) {

  // One player in game
  if (props.lobbyLength === 1) {
    return (
      <div id="game-interface">
        <div className="button-div">
          <button onClick={props.backToLobby}>Back to lobby</button>
        </div>
        <div className="statistics">
          <GameStatistics
            // player={this.props.users.activeUser.name}
            player={props.name}
            score={props.state.score}
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
  if (props.lobbyLength === 2) {
    // Display countdown before game
    while (props.state.countDown > 0 && !props.state.gameOver) {
      props.countDownFunction();

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics
              // player={this.props.users.activeUser.name}
              player={props.name}
              score={props.state.score}
            />
          </div>
          <div id="battlefield">{props.state.countDown}</div>
          <div className="statistics">
            <GameStatistics player={'Your opponent'} />
          </div>
        </div>
      );
    }

    // Start game
    if (props.state.countDown === 0 && props.state.gameDuration > 0) {
      if (!props.state.gameStarted) {
        props.startGame();
        props.state.gameStarted = true;
      }

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics
              // player={this.props.users.activeUser.name}
              player={props.name}
              score={props.state.score}
            />
          </div>
          <div id="battlefield">{props.state.moles}</div>
          <div className="statistics">
            <GameStatistics player={'Your opponent'} />
          </div>
        </div>
      );
    }

    // Game over --> display results
    if (props.state.gameDuration <= 0 && !props.state.returnToLobby) {
      if (!props.state.scoresSent) {
        props.stopGame();
      }

      if (props.state.countDownLobby === 0) {
        props.state.returnToLobby = true
      }

      props.countDownLobbyFunction()

      return (
        <div id="game-interface">
          <div className='final-result'>
            <p>Your score: {props.playerScore}</p>
            <p>Your opponent's score: {props.opponentScore}</p>

            <div>
              <p class='italic'>Back to lobby in {props.state.countDownLobby} seconds</p>
            </div>
          </div>
        </div>
      );
    }


    props.deleteLobby();

    return null;

  } else {
    return null;
  }
}
