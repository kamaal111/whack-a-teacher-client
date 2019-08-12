import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import store from './store';
import LandingPage from './components/LandingPage';
import LobbyList from './components/LobbyList';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Route path="/" exact component={LandingPage} />
        <Route path="/lobby" component={LobbyList} />
      </Provider>
    );
  }
}

export default App;
