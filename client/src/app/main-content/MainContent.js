import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ExchangeDataTable from '../exchange-data-table/ExchangeDataTable';

class MainContent extends Component {

    state = {
        coinExchangeTiles: [1, 2]
    }

    onCreateTile() {
        this.setState(prevState => ({
            coinExchangeTiles: [...prevState.coinExchangeTiles, prevState.coinExchangeTiles.length + 1]
        }));
    }

    onDeleteTile(tileIndex) {
        this.setState(prevState => {
            prevState.coinExchangeTiles.splice( tileIndex, 1);

            return { coinExchangeTiles: prevState.coinExchangeTiles };
        });
    }

    render() {

        const { coinExchangeTiles } = this.state;

        return (
            <div className="App">
                <Header createTile={this.onCreateTile.bind(this)}/>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            {coinExchangeTiles.map((itemIdx, index) =>
                                <ExchangeDataTable key={index} value={index} deleteTile={this.onDeleteTile.bind(this)} />
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default MainContent;