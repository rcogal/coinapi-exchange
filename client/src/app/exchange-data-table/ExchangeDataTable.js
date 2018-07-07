import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalSettings from '../modal-settings/ModalSettings';
import { fetchCurrentBook, postCurrentBook } from '../actions/orderbook';
import Modal from 'react-responsive-modal';
import {soundManager} from 'soundmanager2';

class CoinExchangeTable extends Component {

    state = {
        // contains the selected orderbooks
        orderbooks: [],
        // default auto refresh countdown
        refreshInSecs: 10,
        // modal state
        openModal: false,
        // default to 0
        liquidity: 0,
        selectedAssetBase: '',
        selectedAssetQuote: '',
        // exchange panel reference
        tileHeader: '',
        // selected tone
        selectedTone: '',
        filterOpportunity: 0
    }


    autoRefreshTimer = null;

    enableAutoRefresh = true;

    // Checks the number of loading of records. use to prevent number of times for tone to ring
    isReload = true;

    componentWillUnmount() {
        clearInterval(this.autoRefreshTimer);
    }

    onConfigureSettings(e) {
        e.preventDefault();
        this.setState({ openModal: true });
    }

    clearAutoRefresh() {
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
            this.autoRefreshTimer = null;
        }
    }

    autoRefresh () {
        var timeleft = 10;

        if (this.enableAutoRefresh === false) return;

        this.clearAutoRefresh();

        this.autoRefreshTimer = setInterval(() => {
            this.setState({refreshInSecs: timeleft--});
            if (timeleft < 0) {
                clearInterval(this.autoRefreshTimer);

                this.setState({ refreshInSecs: 10 });
                this.updateTile(this.state);
                this.isReload = true;
            }
        }, 1000);
    }

    onDeleteTile(e) {
        e.preventDefault();

        this.props.deleteTile(this.props.value);
    }

    // @todo create a utility for number formatter
    nFormatter(num, digits) {
        var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "k" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "G" },
          { value: 1E12, symbol: "T" },
          { value: 1E15, symbol: "P" },
          { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
      }

    onCloseConfigModal(e) {
        this.setState({ openModal: false });
    }

    opportunityRenderer(orderbook) {

        var opportunity = 0;

        try {
            opportunity = ((( orderbook.bid_price - orderbook.ask_price ) / orderbook.bid_price) * 100);

            this.filterOpportunity(opportunity);
        } catch (e) {

        } finally {
            switch (Math.sign(opportunity)) {
                case 0: 
                case 1: return <label className="color-green">{opportunity.toFixed(2) + '%'} </label>;
                case -0:
                case -1: return <label className="color-red">{opportunity.toFixed(2) + '%'}</label>;
            }
        }
    }

    bidPriceRenderer(orderbook) {
        return this.nFormatter(orderbook.bid_price, 2);
    }

    askPriceRenderer(orderbook) {
        return this.nFormatter(orderbook.ask_price, 2);
    }

    liquidityRenderer(liquidity=0) {
        return this.nFormatter(liquidity, 1);
    }

    updateStates(settings={}) {
        this.setState({
            selectedExchange: settings.selectedExchange,
            selectedAssetBase: settings.selectedAssetBase,
            selectedAssetQuote: settings.selectedAssetQuote,
            liquidity: settings.liquidity,
            selectedTone: settings.selectedTone,
            filterOpportunity: settings.filterOpportunity
        });
    }

    fetchPostOrderBook(settings = {}) {

        var exchanges = settings.selectedExchange.split(',') || [];

        this.props.postCurrentBook({
            base: settings.selectedAssetBase,
            quote: settings.selectedAssetQuote,
            liquidity: settings.liquidity,
            settings
        }).then(orderbook => {
            if (orderbook.data.success === true) {
                this.updateStates(settings);

                this.setState({
                    orderbooks: orderbook.data.result,
                    openModal: this.autoRefreshTimer && this.state.openModal ? true : false,
                    tileHeader: `${settings.selectedAssetBase}/${settings.selectedAssetQuote}, ${settings.liquidity || 0} (Liquidity), ${exchanges.length} (Selected Exchanges)`
                });

                this.autoRefresh();
            } else {
                alert(orderbook.data.message);
            }
        });
    }

    updateTile(settings) {

        const { liquidity = 0, selectedAssetBase, selectedAssetQuote, selectedExchange } = settings;

        if (!selectedAssetBase || !selectedAssetQuote || !selectedExchange.length) {
            return false;
        }
        // this.fetchCurrentBook(liquidity, selectedExchange, settings);

        this.fetchPostOrderBook({
            selectedAssetBase,
            selectedAssetQuote,
            selectedExchange,
            liquidity
        });
    }

    playSound(url) {

        if (!url) return;

        soundManager.createSound({
            url: url,
            autoLoad: true,
            autoPlay: true,
            volume: 100
        });
    }

    filterOpportunity(opportunity) {

        if (this.isReload === false) return;

        var filterOpportunity = parseFloat(this.state.filterOpportunity);

        switch(true) {
            case filterOpportunity > opportunity:
            case filterOpportunity < opportunity:

                this.playSound(this.state.selectedTone);
                this.isReload = false;
                return true;

        }

        return false;
    }

    save(settings) {
        this.clearAutoRefresh();
        this.updateTile(settings);
    }

    render() {

        var {
            refreshInSecs,
            orderbooks,
            openModal,
            selectedAssetBase,
            selectedAssetQuote,
            selectedExchange,
            tileHeader
        } = this.state;

        return (
            <div className="col-md-6 shadow">
                <div className="panel panel-default">
                    <div className="panel-heading excoin-color-light">
                        <div className="row">
                            <div className="col-sm-6 text-left">
                                <label className="font-weight-bold">{tileHeader}</label>
                            </div>
                            <div className="col-sm-6 text-right">
                                <div className="navigation__toggles">
                                    <a href="" className="text-muted" onClick={this.onConfigureSettings.bind(this)}>
                                        <i className="fa fa-cog"></i>
                                    </a>
                                    <a href="" className="text-muted" onClick={this.onDeleteTile.bind(this)}>
                                        <i className="fa fa-trash"></i>
                                    </a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive x-app-table-responsive x-mh-232">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Exchange</th>
                                        <th>Liquidity</th>
                                        <th>Size</th>
                                        <th>Bid</th>
                                        <th>Opportunity</th>
                                        <th>Ask</th>
                                        <th>Size</th>
                                        <th>Liquidity</th>
                                        <th>Exchange</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderbooks.map((orderbook, index) =>
                                        <tr key={index}>
                                            <td>{orderbook.bid_exchange}</td>
                                            <td>{orderbook.bid_liquidity && this.liquidityRenderer(orderbook.bid_liquidity)}</td>
                                            <td>{orderbook.bid_size && orderbook.bid_size.toFixed(2)}</td>
                                            <td className="color-green">{this.bidPriceRenderer(orderbook)}</td>
                                            <td>{this.opportunityRenderer(orderbook)}</td>
                                            <td className="color-red">{this.askPriceRenderer(orderbook)}</td>
                                            <td>{orderbook.ask_size && orderbook.ask_size.toFixed(2)}</td>
                                            <td>{orderbook.ask_liquidity && this.liquidityRenderer(orderbook.ask_liquidity)}</td>
                                            <td>{orderbook.ask_exchange}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="panel-footer">{(!!orderbooks.length && 
                        <span>Refreshing in {refreshInSecs} seconds</span>
                    )}</div>
                </div>
                <Modal showCloseIcon={false} open={openModal} onClose={this.onCloseConfigModal.bind(this)} center classNames={{ modal: 'custom-modal' }}>
                    <ModalSettings
                        selectedExchange={selectedExchange}
                        selectedAssetBase={selectedAssetBase}
                        selectedAssetQuote={selectedAssetQuote}
                        closeConfigModal={this.onCloseConfigModal.bind(this)}
                        saveConfig={this.save.bind(this)}
                        />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    metadata: state.metadata
});

export default connect(mapStateToProps, { fetchCurrentBook, postCurrentBook })(CoinExchangeTable);
