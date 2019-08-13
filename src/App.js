import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateAccountFormContainer from './components/CreateAccountForm';
import LobbyListContainer from './components/LobbyList';
import LoginFormContainer from './components/LoginForm';
import CreateGameInterfaceContainer from './components/CreateGameInterface';
import GameInterfaceContainer from './components/GameInterface';

import { allLobbies } from './actions';

import './App.css';

class App extends Component {
  source = new EventSource(
    // `https://morning-caverns-95025.herokuapp.com/stream`
    'http://localhost:4000/stream'
  );

  componentDidMount() {
    this.source.onmessage = event => {
      this.props.allLobbies(JSON.parse(event.data));
    };
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={CreateAccountFormContainer} />
        <Route path="/login" exact component={LoginFormContainer} />
        <Route
          path="/create-game"
          exact
          component={CreateGameInterfaceContainer}
        />
        <Route
          path="/lobby"
          render={props => <LobbyListContainer {...props} />}
        />
        <Route
          path="/game/:gameId"
          exact
          render={props => <GameInterfaceContainer {...props} />}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ lobbies }) => ({ lobbies });

export default connect(
  mapStateToProps,
  { allLobbies }
)(App);
