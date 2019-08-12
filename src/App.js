import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import store from './store'
import LandingPage from './components/LandingPage';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route path='/' exact component={LandingPage}></Route>
        </div>
      </Provider>
    );
  }
}

export default App
