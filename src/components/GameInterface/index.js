import React from 'react';
import { connect } from 'react-redux';
import * as request from 'superagent';

import GameStatistics from '../GameStatistics';

import './GameInterface.css';
import { authorizeUser } from '../../actions';

import url from '../../urls';

class GameInterfaceContainer extends React.Component {
  state = {
    moleCount: 0,
    moles: [],
    score: 0,
    intervalId: 0
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
    const mole = document.getElementById(`${e.target.id}`);
    mole.style.display = 'none';
    this.setState({ score: this.state.score + 1 });
  };

  renderMole = () => {
    const randomHeight = Math.min(Math.floor(Math.random() * 80), 70);
    const randomWidth = Math.min(Math.floor(Math.random() * 60), 54.5);

    const moleStyle = {
      top: `${randomHeight}vh`,
      left: `${randomWidth}vw`
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

  handleGameStop = () => {
    clearInterval(this.state.intervalId);
    const moles = document.getElementsByClassName('mole');
    const molesArray = Array.from(moles);
    setTimeout(() => {
      molesArray.forEach(mole => {
        mole.style.display = 'none';
      });
    }, 1000);

    const foundLobby = this.props.lobbies.find(
      lobby => lobby.id === Number(this.props.match.params.gameId)
    );

    const findPlayerIndex = foundLobby.users.findIndex(
      element => this.props.users.activeUser.id === element.id
    );

    console.log('findPlayerIndex', findPlayerIndex);

    return request
      .put(
        `${url}/game/${this.props.match.params.gameId}/score/${findPlayerIndex +
          1}`
      )
      .send({ score: this.state.score });
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
      console.log('foundLobby.users', foundLobby.users);
      console.log('this.props.users.activeUser', this.props.users.activeUser);
      const findPlayerIndex = foundLobby.users.findIndex(
        element => this.props.users.activeUser.id === element.id
      );

      console.log('findPlayerIndex', findPlayerIndex);

      if (findPlayerIndex === 0) {
        return foundLobby.playerOneScore > foundLobby.playerTwoScore;
      }

      return foundLobby.playerTwoScore > foundLobby.playerOneScore;
    };

    if (foundLobby.users.length === 2) {
      console.log('foundLobby.playerOneScore', foundLobby.playerOneScore);
      console.log('foundLobby.playerTwoScore', foundLobby.playerTwoScore);
      if (
        foundLobby.playerOneScore !== null &&
        foundLobby.playerTwoScore !== null
      ) {
        if (calculateWinner() === false) {
          return <h1>LOSER</h1>;
        }

        return <h1>WINNER</h1>;
      }

      return (
        <div id="game-interface">
          <div className="statistics">
            <GameStatistics player="Nicola" score={this.state.score} />
          </div>
          <div id="battlefield">{moles}</div>
          <div className="statistics">
            <GameStatistics />
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
        <button
          onClick={() => {
            const intervalId = setInterval(this.launchTimer, 1000);
            this.setState({ intervalId: intervalId });
          }}
        >
          START
        </button>
        <button
          onClick={() => {
            authorizeUser(
              this.props.users.activeUser.token,
              this.props.users.activeUser.id,
              null
            );

            this.props.history.push('/lobby');
          }}
        >
          LEAVE LOBBY
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ users, lobbies }) => ({ users, lobbies });

export default connect(
  mapStateToProps,
  { authorizeUser }
)(GameInterfaceContainer);
