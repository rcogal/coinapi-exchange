import React, { Component } from 'react';
// import ExchangeDataTable from '../exchange-data-table/ExchangeDataTable';

class MainContent extends Component {
    onDeleteTile(tileIndex) {
        this.props.deleteTile(tileIndex);
    }

    render() {

        const { exchangeTiles } = this.props;

        return (
            <main>
                <div className="container-fluid">
                    <div className="row">
                    {/* {exchangeTiles.map((itemIdx, index) =>
                        <ExchangeDataTable key={index} value={index} deleteTile={this.onDeleteTile.bind(this, index)} />
                    )} */}
                    </div>
                </div>
            </main>
        );
    }
}

export default MainContent;