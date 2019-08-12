import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import store from './store';
import CreateAccountFormContainer from './components/CreateAccountForm';
import LobbyList from './components/LobbyList';
import LoginFormContainer from './components/LoginForm';
import CreateGameInterfaceContainer from './components/CreateGameInterface';
import GameInterfaceContainer from './components/GameInterface';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact component={CreateAccountFormContainer} />
          <Route path="/lobby" component={LobbyList} />
          <Route path="/login" exact component={LoginFormContainer} />
          <Route path="/create-game" exact component={CreateGameInterfaceContainer} />
          <Route path="/game/:gameId" exact component={GameInterfaceContainer} />
        </div>
      </Provider>
    );
  }
}

export default App;
