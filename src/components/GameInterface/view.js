import React from 'react'
import GameStatistics from '../GameStatistics'
import './GameInterface.css';

export default function GameInterface(props) {

  console.log('Props:', props)

  // one player in game
  if (props.lobbyLength === 1) {
    return (
      <div id="game-interface">
        <button onClick={() => props.history.push('/lobby')}>Back to lobby</button>
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

  if (props.lobbyLength === 2) {

    props.countDownFunction()

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

      if (props.state.countDown === 0) {
        
        if (!props.state.gameStart) {
          props.startGame()
          props.state.gameStart = true
        }

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

      props.state.gameOver = true;

      if (props.state.gameDuration === 0) {
        props.stopGame()
        if (props.state.countDown === 0) {
          props.state.countDown = 10
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
}