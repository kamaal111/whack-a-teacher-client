import React from 'react'
import GameStatistics from '../GameStatistics'
import './GameInterface.css';

export default function GameInterface(props) {

  // One player in game
  if (props.lobbyLength === 1) {
    return (
      <div id="game-interface">
        <button onClick={props.backToLobby}>Back to lobby</button>
        <div className="statistics">
          <GameStatistics
            // player={this.props.users.activeUser.name}
            player={'Your name'}
            score={'P1 score'}
          />
        </div>
        <div id="battlefield"></div>
        <div className="statistics">
          <p>Waiting for another player to join...</p>
        </div>
      </div>
    )
  }

  // Two players in game
  if (props.lobbyLength === 2) {

    // Initializes on-screen countdown before game starts
    props.countDownFunction()

    // Game has not ended yet
    if (!props.state.gameOver) {
      while (props.state.countDown > 0) {
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

      // Count down is over
      if (props.state.countDown === 0) {
        
        // Initialize game
        if (!props.state.gameStart) {
          props.startGame()
          props.state.gameStart = true
        }

        // While the game is being played
        while (props.state.gameDuration > 0) {
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
      }
    }

      // End game
      props.state.gameOver = true;

      // Return to lobby once countdown is over
      if (props.state.countDown === 0 && props.state.returnToLobby) {
        props.deleteLobby()
      }

      // Stop the game and set the countdown for rematch or returning to lobby
      if (props.state.gameDuration === 0) {
        props.stopGame()
        if (props.state.countDown === 0 && !props.state.returnToLobby) {
          props.state.countDown = 5
          props.state.returnToLobby = true;
        }
        props.countDownFunction()
        console.log('stopped')
        return (
          <div id='game-interface'>
            <p>Player one score:</p>
            <p>Player two score:</p>

            <button>Rematch?</button>
            <button>Back to lobby {props.state.countDown}</button>
          </div>
        )
      }
  }
  else {
    return(
      <p>Hey</p>
    )
  }
}