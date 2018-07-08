import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { mainContentOperations } from './app/main-content/duck';

class Startup extends Component {

    state = {
        connection: false
    }

    initialiseConnection() {

        const that = this;

        axios.all([ this.props.fetchCryptoAssets(), this.props.fetchExchanges() ])
            .then(axios.spread(function (assets, exchanges) {
                that.setState({
                    connection: true
                });
            }));
    }

    componentWillMount() {
        // this.props.actions.initialiseConnection();
        this.initialiseConnection();
    }

    render() {

        const { connection } = this.state;

        return connection
            ? this.props.children
            : (<div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>);
    }
}

export default connect(null, {
    fetchCryptoAssets: mainContentOperations.fetchCryptoAssets,
    fetchExchanges: mainContentOperations.fetchExchanges
})(Startup);