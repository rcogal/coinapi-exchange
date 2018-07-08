import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MainContent from './app/main-content/MainContent';
import store from './app/index';
import Startup from './Startup';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Startup>
          <MainContent />
        </Startup>
      </Provider>
    );
  }
}

export default App;