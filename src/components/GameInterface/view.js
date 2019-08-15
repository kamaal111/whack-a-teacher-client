import React from 'react';
import GameStatistics from '../GameStatistics';
import * as request from 'superagent';

import url from '../../urls';

import './GameInterface.css';

export default function GameInterface(props) {
  // One player in game
  if (props.lobbyLength === 1) {
    return (
      <div id="game-interface">
        <div className='button-div'>
        <button onClick={props.backToLobby}>Back to lobby</button>
        </div>
        <div className="statistics">
          <GameStatistics
            // player={this.props.users.activeUser.name}
            player={'Your name'}
            score={'P1 score'}
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
      props.countDownFunction()

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics
              // player={this.props.users.activeUser.name}
              player={'Your name'}
              score={'P1 score'}
            />
          </div>
          <div id="battlefield">{props.state.countDown}</div>
          <div className="statistics">
            <GameStatistics
              player={'Your opponent'}
            />
          </div>
        </div>
      )
    }

    // Start game
    if (props.state.countDown === 0 && props.state.gameDuration > 0) {

      if (!props.state.gameStarted) {
        props.startGame()
        props.state.gameStarted = true
      }

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics
              // player={this.props.users.activeUser.name}
              player={'Your name'}
              score={'P1 score'}
            />
          </div>
          <div id="battlefield">{props.state.moles}</div>
          <div className="statistics">
            <GameStatistics
              player={'Your opponent'}
            />
          </div>
        </div>
      )
    }

    // Game over --> display results
    if (props.state.gameDuration <= 0) {

      if (!props.state.scoresSent) {
        props.stopGame()
      }
      
        return (
          <div id='game-interface'>
            <p>Player one score:</p>
            <p>Player two score:</p>
  
            <div>
              <button>Back to lobby {props.state.countDownLobby}</button>
            </div>
          </div>
        )

      // return to lobby
      props.deleteLobby()
    }
  }
  else {
    return(
      null
    )
  }
}
