import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import store from './store'
import CreateAccountFormContainer from './components/CreateAccountFormContainer'
import LoginFormContainer from './components/LoginFormContainer'
import LobbiesContainer from './components/LobbiesContainer'
import CreateGameContainer from './components/CreateGameContainer'
import GameContainer from './components/GameContainer'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path='/' exact component={CreateAccountFormContainer}></Route>
          <Route path='/login' exact component={LoginFormContainer}></Route>
          <Route path='/lobby' exact component={LobbiesContainer}></Route>
          <Route path='/create-game' exact component={CreateGameContainer}></Route>
          <Route path='/game/:gameId' exact component={GameContainer}></Route>
        </div>
      </Provider>
    );
  }
}

export default App
