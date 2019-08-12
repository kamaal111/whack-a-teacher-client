import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import store from './store';
import LobbyList from './components/LobbyList';
import CreateAccountFormContainer from './components/CreateAccountFormContainer';
import LoginFormContainer from './components/LoginFormContainer';
import CreateGameContainer from './components/CreateGameContainer';
import GameContainer from './components/GameContainer';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path="/" exact component={CreateAccountFormContainer} />
          <Route path="/lobby" component={LobbyList} />
          <Route path="/login" exact component={LoginFormContainer} />
          <Route path="/create-game" exact component={CreateGameContainer} />
          <Route path="/game/:gameId" exact component={GameContainer} />
        </div>
      </Provider>
    );
  }
}

export default App;
