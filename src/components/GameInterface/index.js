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
    intervalId: 0,
    countDown: 10
  };

  componentDidMount() {
    console.log('this.props!!!!!!!!!!!!', this.props);
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

  findPlayerIndex = foundLobby => {
    return foundLobby.users.findIndex(
      element => this.props.users.activeUser.id === element.id
    );
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

    const findPlayerIndex = foundLobby.users.findIndex(
      element => this.props.users.activeUser.id === element.id
    );

    const calculateWinner = () => {
      this.findPlayerIndex(foundLobby);


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
        if (calculateWinner() === false) {
          countDowner();

          if (this.state.countDown === 0) {
            this.deleteLobby();
          }

          return (
            <div>
              <h1>LOSER</h1>
              <button
                onClick={() => {
                  this.setState({ countDown: 10 });
                  return handleRematch();
                }}
              >
                REMATCH
              </button>
            </div>
          );
        }

        if (calculateWinner() === 0) {
          countDowner();

          if (this.state.countDown === 0) {
            this.deleteLobby();
          }

          return (
            <div>
              <h1>DRAW</h1>
              <button
                onClick={() => {
                  this.setState({
                    countDown: 10
                  });
                  return handleRematch();
                }}
              >
                REMATCH
              </button>
            </div>
          );
        }

        countDowner();

        if (this.state.countDown === 0) {
          this.deleteLobby();
        }

        return (
          <div>
            <h1>WINNER</h1>
            <button
              onClick={() => {
                this.setState({ countDown: 10 });
                return handleRematch();
              }}
            >
              REMATCH
            </button>
          </div>
        );
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
            <GameStatistics player={'other player'} />
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
            this.setState({ intervalId });
          }}
        >
          READY
        </button>
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
