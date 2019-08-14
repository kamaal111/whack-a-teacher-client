import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateAccountFormContainer from './components/CreateAccountForm';
import LobbyListContainer from './components/LobbyList';
import LoginFormContainer from './components/LoginForm';
import GameInterfaceContainer from './components/GameInterface';

import { allLobbies } from './actions';

import url from './urls';

import './App.css';

class App extends Component {
  source = new EventSource(`${url}/stream`);

  componentDidMount() {
    this.source.onmessage = event => {
      console.log('Data:', JSON.parse(event.data));
      this.props.allLobbies(JSON.parse(event.data));
    };
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={CreateAccountFormContainer} />
        <Route path="/login" exact component={LoginFormContainer} />
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
