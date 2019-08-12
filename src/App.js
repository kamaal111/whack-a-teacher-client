import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import store from './store'
import CreateAccountFormContainer from './components/CreateAccountFormContainer'
import LoginFormContainer from './components/LoginFormContainer'
import LobbiesContainer from './components/LobbiesContainer'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path='/' exact component={CreateAccountFormContainer}></Route>
          <Route path='/login' exact component={LoginFormContainer}></Route>
          <Route path='/lobby' exact component={LobbiesContainer}></Route>
        </div>
      </Provider>
    );
  }
}

export default App
