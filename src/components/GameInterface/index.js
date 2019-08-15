import React from 'react';
import { connect } from 'react-redux';
import * as request from 'superagent';

import GameStatistics from '../GameStatistics';
import WinConditionButton from './WinConditionButton';

import { authorizeUser } from '../../actions';

import url from '../../urls';

import './GameInterface.css';

class GameInterfaceContainer extends React.Component {
  state = {
    moleCount: 0,
    moles: [],
    score: 0,
    intervalId: 0,
    countDown: 10,
    countGameStart: 5,
    gameStart: false
  };

  componentDidMount() {
    if (this.props.users.activeUser === null) {
      return this.props.history.push('/login');
    }

    if (
      this.props.users.activeUser === null &&
      this.props.users.activeUser.authorized === false
    ) {
      return this.props.history.push('/login');
    }

    if (this.props.users.activeUser !== null) {
      this.props.authorizeUser(
        this.props.users.activeUser.token,
        this.props.users.activeUser.id,
        this.props.match.params.gameId
      );
    }
  }

  launchTimer = () => {
    for (let i = 0; i < 1; i++) {
      this.setState({
        moleCount: this.state.moleCount + 1,
        moles: [...this.state.moles, this.renderMole()]
      });
    }
  };

  whackMole = e => {
    const audio = new Audio(
      'http://wohlsoft.ru/docs/Sounds/SMBX_OPL/SMBX_OPL_Sounds_src/WAV/sm-boss-hit.wav'
    );
    audio.play();
    const mole = document.getElementById(`${e.target.id}`);
    mole.style.display = 'none';
    this.setState({ score: this.state.score + 1 });
  };

  renderMole = () => {
    const randomHeight = Math.min(Math.floor(Math.random() * 80), 70);
    const randomWidth = Math.min(Math.floor(Math.random() * 60), 54.5);

    const arrayOfPictures = ['rein', 'mimi', 'kelley', 'david', 'arien'];

    const moleStyle = {
      top: `${randomHeight}vh`,
      left: `${randomWidth}vw`,
      backgroundImage: `url(${require(`../../images/${
        arrayOfPictures[Math.floor(Math.random() * arrayOfPictures.length)]
      }.png`)})`
    };

    const mole = (
      <div
        style={moleStyle}
        className="mole"
        key={this.state.moleCount}
        id={`mole-${this.state.moleCount + 1}`}
        onClick={this.whackMole}
      />
    );
    return mole;
  };

  findPlayerIndex = foundLobby => {
    return foundLobby.users.findIndex(
      element => this.props.users.activeUser.id === element.id
    );
  };

  handleGameStop = async () => {
    clearInterval(this.state.intervalId);
    const moles = document.getElementsByClassName('mole');
    const molesArray = Array.from(moles);

    setTimeout(() => {
      molesArray.forEach(mole => {
        mole.style.display = 'none';
      });
    }, 1000);

    const findPlayerIndex =
      this.props.lobbies
        .find(lobby => lobby.id === Number(this.props.match.params.gameId))
        .users.findIndex(
          element => this.props.users.activeUser.id === element.id
        ) + 1;

    const res = await request
      .put(
        `${url}/game/${this.props.match.params.gameId}/score/${findPlayerIndex}`
      )
      .send({ score: this.state.score });

    this.setState({
      moleCount: 0,
      moles: [],
      score: 0,
      intervalId: 0
    });

    console.log('res', res);
  };

  // upon end delete lobby
  deleteLobby = async () => {
    await request.del(`${url}/games/${this.props.match.params.gameId}`);

    return this.props.history.push('/lobby');
  };

  renderGame = () => {
    const { moles } = this.state;
    console.log(moles);
    if (this.state.moleCount > 15) {
      moles.shift();
    }

    const foundLobby = this.props.lobbies.find(
      lobby => lobby.id === Number(this.props.match.params.gameId)
    );

    const calculateWinner = () => {
      if (foundLobby.playerOneScore === foundLobby.playerTwoScore) {
        return 0;
      }

      if (this.findPlayerIndex(foundLobby) === 0) {
        return foundLobby.playerOneScore > foundLobby.playerTwoScore;
      }

      return foundLobby.playerTwoScore > foundLobby.playerOneScore;
    };

    const handleRematch = async () => {
      const res = await request.put(
        `${url}/game/${this.props.match.params.gameId}/rematch`
      );

      this.setState({ countDown: 10 });

      console.log('res', res);
    };

    const countDowner = () => {
      const newCount = this.state.countDown - 1;
      let timer = setTimeout(
        () => this.setState({ countDown: newCount }),
        1000
      );

      if (this.state.countDown === 0) {
        clearInterval(timer);
      }
    };

    if (foundLobby && foundLobby.users.length === 2) {
      if (
        foundLobby.playerOneScore !== null &&
        foundLobby.playerTwoScore !== null
      ) {
        const opponentScore =
          this.findPlayerIndex(foundLobby) === 0
            ? foundLobby.playerTwoScore
            : foundLobby.playerOneScore;

        const playerScore =
          this.findPlayerIndex(foundLobby) === 0
            ? foundLobby.playerOneScore
            : foundLobby.playerTwoScore;

        if (calculateWinner() === false) {
          countDowner();
          if (this.state.countDown === 0) this.deleteLobby();
          return (
            <WinConditionButton
              handleOnclick={handleRematch}
              winOrLose={'LOSER'}
              playerScore={playerScore}
              opponentScore={opponentScore}
            />
          );
        }

        if (calculateWinner() === 0) {
          countDowner();
          if (this.state.countDown === 0) this.deleteLobby();
          return (
            <WinConditionButton
              handleOnclick={handleRematch}
              winOrLose={'DRAW'}
              playerScore={playerScore}
              opponentScore={opponentScore}
            />
          );
        }

        countDowner();
        if (this.state.countDown === 0) this.deleteLobby();
        return (
          <WinConditionButton
            handleOnclick={handleRematch}
            winOrLose={'WINNER'}
            playerScore={playerScore}
            opponentScore={opponentScore}
          />
        );
      }

      const startGame = () => {
        const intervalId = setInterval(this.launchTimer, 1000);
        this.setState({ intervalId, gameStart: true });
      };

      const countGameStarter = () => {
        const newCount = this.state.countGameStart - 1;
        let timer = setTimeout(
          () => this.setState({ countGameStart: newCount }),
          1000
        );

        if (this.state.countGameStart === 0) {
          startGame();
          clearInterval(timer);
        }
      };

      if (this.state.gameStart === false) {
        countGameStarter();
      }

      const player2Index =
        foundLobby.users.findIndex(
          element => this.props.users.activeUser.id === element.id
        ) === 0
          ? 1
          : 0;

      if (this.state.countGameStart !== 0) {
        return <h1>{this.state.countGameStart}</h1>;
      }

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics
              player={this.props.users.activeUser.name}
              score={this.state.score}
            />
          </div>
          <div id="battlefield">{moles}</div>
          <div className="statistics">
            <GameStatistics player={foundLobby.users[player2Index].name} />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderGame()}
        <button onClick={this.handleGameStop}>Stop game</button>
        <button>LEAVE LOBBY IN {this.state.countDown}</button>
      </div>
    );
  }
}

const mapStateToProps = ({ users, lobbies }) => ({ users, lobbies });

export default connect(
  mapStateToProps,
  { authorizeUser }
)(GameInterfaceContainer);
