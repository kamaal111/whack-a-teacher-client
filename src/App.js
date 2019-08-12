import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import store from './store';
import CreateAccountForm from './components/CreateAccountForm';
import LobbyList from './components/LobbyList';
import LoginForm from './components/LoginForm';
import CreateGameInterface from './components/CreateGameInterface';
import GameInterface from './components/GameInterface';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact component={CreateAccountForm} />
          <Route path="/lobby" component={LobbyList} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/create-game" exact component={CreateGameInterface} />
          <Route path="/game/:gameId" exact component={GameInterface} />
        </div>
      </Provider>
    );
  }
}

export default App;
