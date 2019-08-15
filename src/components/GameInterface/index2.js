import React from 'react';
import { connect } from 'react-redux';
import * as request from 'superagent';

import GameInterface from './view'
import { authorizeUser } from '../../actions';

import url from '../../urls';

class GameInterfaceContainer extends React.Component {
  state = {
    moleCount: 0,
    moles: [],
    score: 0,
    intervalId: 0,
    countDown: 5,
    gameStart: false
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

  countDown = () => {
    const newCount = this.state.countDown - 1;
    let timer = setTimeout(
      () => this.setState({ countDown: newCount }),
      1000
    );

    if (this.state.countDown === 0) {
      clearInterval(timer);
    }
  };

  launchTimer = () => {
    for (let i = 0; i < 1; i++) {
      this.setState({
        moleCount: this.state.moleCount + 1,
        moles: [...this.state.moles, this.renderMole()]
      });
    }
  };

  startGame = () => {
    const intervalId = setInterval(this.launchTimer, 1000);
    this.setState({ intervalId });
  }

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

  render() {

    const lobby = this.props.lobbies.find(
      lobby => lobby.id === Number(this.props.match.params.gameId)
    );

    // if there is a lobby
    if (lobby) {
      return (
        <GameInterface
          lobbyLength={lobby.users.length}
          state={this.state}
          history={this.props.history}
          countDownFunction={this.countDown}
          startGame={this.startGame}
        />
      )
    }
    // Return nothing if there is no lobby
    return (
      <div></div>
    )
  }

}

const mapStateToProps = ({ users, lobbies }) => ({ users, lobbies });

export default connect(
  mapStateToProps,
  { authorizeUser }
)(GameInterfaceContainer);