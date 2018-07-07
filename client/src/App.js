import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Header from './app/layout/Header';
import Footer from './app/layout/Footer';
import MainContent from './app/main-content/MainContent';
import store from './app/index';
import Startup from './Startup';
import './App.css';

class App extends Component {

  state = {
    coinExchangeTiles: [1, 2]
  }

  onCreateTile() {
    this.setState(prevState => ({
      coinExchangeTiles: [...prevState.coinExchangeTiles, prevState.coinExchangeTiles.length + 1]
    }));
  }

  onDeleteTileExchange(tileIndex) {
    this.setState(prevState => {
      prevState.coinExchangeTiles.splice( tileIndex -1, 1);

      return { coinExchangeTiles: prevState.coinExchangeTiles };
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Startup>
          <div className="App">
            <Header createTile={this.onCreateTile.bind(this)}/>
            <MainContent exchangeTiles={this.state.coinExchangeTiles} deleteTile={this.onDeleteTileExchange.bind(this)} />
            <Footer />
          </div>
        </Startup>
      </Provider>
    );
  }
}

export default App;