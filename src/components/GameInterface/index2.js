import React from 'react';
import { connect } from 'react-redux';
import * as request from 'superagent';

import GameInterface from './view';
import { authorizeUser } from '../../actions';

import url from '../../urls';

class GameInterfaceContainer extends React.Component {
  state = {
    moleCount: 0,
    moles: [],
    score: 0,
    intervalId: 0,
    countDown: 10,
    countDownLobby: 10,
    gameStarted: false,
    gameDuration: 10,
    gameOver: false,
    scoresSent: false,
    returnToLobby: false
  };

  componentDidMount() {
    if (this.props.users.activeUser !== null) {
      this.props.authorizeUser(
        this.props.users.activeUser.token,
        this.props.users.activeUser.id,
        this.props.match.params.gameId
      );
    }
  }

  countDownLobby = () => {
    const newCount = this.state.countDownLobby - 1;
    let timer = setTimeout(
      () => this.setState({ countDownLobby: newCount }),
      1000
    );

    if (this.state.countDownLobby === 0) {
      clearInterval(timer);
    }
  };

  countDown = () => {
    const newCount = this.state.countDown - 1;
    let timer = setTimeout(() => this.setState({ countDown: newCount }), 1000);

    if (this.state.countDown === 0) {
      clearInterval(timer);
    }
  };

  launchTimer = () => {
    for (let i = 0; i < 1; i++) {
      this.setState({
        moleCount: this.state.moleCount + 1,
        moles: [...this.state.moles, this.renderMole()],
        gameDuration: this.state.gameDuration - 1
      });
    }
  };

  startGame = () => {
    const intervalId = setInterval(this.launchTimer, 600);
    this.setState({ intervalId, gameStart: true });
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

  foundLobby = () => {
    return this.props.lobbies.find(
      lobby => lobby.id === Number(this.props.match.params.gameId)
    );
  };

  findOpponentScore = player1 => {
    return this.foundLobby().users.findIndex(
      element => player1.id === element.id
    ) === 0
      ? this.foundLobby().playerTwoScore
      : this.foundLobby().playerOneScore;
  };

  findOpponent = player1 => {
    if (this.foundLobby().users.length === 2) {
      return this.foundLobby().users.find(user => user.id !== player1.id).name;
    }

    return '';
  };

  stopGame = async () => {
    try {
      clearInterval(this.state.intervalId);
      const moles = document.getElementsByClassName('mole');
      const molesArray = Array.from(moles);
      setTimeout(() => {
        molesArray.forEach(mole => {
          mole.style.display = 'none';
        });
      }, 1000);

      const playerIndex =
        this.foundLobby().users.findIndex(
          element => this.props.users.activeUser.id === element.id
        ) + 1;

      const res = await request
        .put(
          `${url}/game/${this.props.match.params.gameId}/score/${playerIndex}`
        )
        .send({ score: this.state.score });

      console.log('res', res);

      this.setState({
        scoresSent: true
      });

      return null;
    } catch (error) {
      console.error(error);
    }
  };

  deleteLobby = async () => {
    try {
      await request.del(`${url}/games/${this.props.match.params.gameId}`);
      return this.props.history.push('/lobby');
    } catch (error) {
      console.error(error);
    }
  };

  backToLobby = async () => {
    try {
      await request
        .put(`${url}/user/${this.props.users.activeUser.id}/remove`)
        .set('authorization', `Bearer ${this.props.users.activeUser.token}`);
      return this.props.history.push('/lobby');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const lobby = this.props.lobbies.find(
      lobby => lobby.id === Number(this.props.match.params.gameId)
    );

    // if there is a lobby
    if (lobby) {
      return (
        <GameInterface
          name={this.props.users.activeUser.name}
          lobbyLength={lobby.users.length}
          state={this.state}
          countDownFunction={this.countDown}
          countDownLobbyFunction={this.countDownLobby}
          startGame={this.startGame}
          stopGame={this.stopGame}
          deleteLobby={this.deleteLobby}
          backToLobby={this.backToLobby}
          match={this.props.match}
          playerScore={this.state.score}
          opponentScore={this.findOpponentScore(this.props.users.activeUser)}
          opponentName={this.findOpponent(this.props.users.activeUser)}
        />
      );
    }
    // Return nothing if there is no lobby
    return null;
  }
}

const mapStateToProps = ({ users, lobbies }) => ({ users, lobbies });

export default connect(
  mapStateToProps,
  { authorizeUser }
)(GameInterfaceContainer);
