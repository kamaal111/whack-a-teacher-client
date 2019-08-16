import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateAccountFormContainer from './components/CreateAccountForm';
import LobbyListContainer from './components/LobbyList';
import LoginFormContainer from './components/LoginForm';
import GameInterfaceContainer from './components/GameInterface/index2';

import { allLobbies } from './actions';

import url from './urls';

import './App.css';

class App extends Component {
  source = new EventSource(`${url}/stream`);

  componentDidMount() {
    this.source.onmessage = event => {
      // console.log('Data:', JSON.parse(event.data));
      this.props.allLobbies(JSON.parse(event.data));
    };
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={CreateAccountFormContainer} />
        <Route exact path="/login" component={LoginFormContainer} />
        <Route exact path="/lobby" component={LobbyListContainer} />
        <Route exact path="/game/:gameId" component={GameInterfaceContainer} />
      </div>
    );
  }
}

export default connect(
  null,
  { allLobbies }
)(App);
