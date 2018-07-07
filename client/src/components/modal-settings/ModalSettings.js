import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import toneResources from '../../resources';

class ModalSettings extends Component {

    state = {
        liquidity: 0,
        selectedAssetBase: '',
        selectedAssetQuote: '',
        selectedTone: '',
        filterOpportunity: 0,
        assetBase: [],
        exchange: [],
        selectedExchange: [],
        loading: false
    }

    componentWillMount() {

        const { asset, exchange } = this.props.metadata;
        const {
            selectedAssetBase,
            selectedAssetQuote,
            selectedExchange
        } = this.props;

        this.setState({
            selectedAssetBase,
            selectedAssetQuote,
            selectedExchange
        });

        if (asset.data.success === true) {
            this.setState({
                assetBase: asset.data.result
            });
        }

        if (exchange.data.success === true) {
            this.setState({
                exchange: this.transformExchange(exchange.data.result)
            });
        }
    }

    transformExchange(exchange) {

        const list = [];

        exchange.forEach(item => {
            list.push({
                label: item.name,
                value: item.exchange_id
            });
        });

        return list;
    }

    getQuotes() {
        return [ 'USD', 'EUR', 'GBP' ];
    }

    getAvailableTones() {
        return toneResources;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSelectChange(selectedExchange) {
        this.setState({ selectedExchange });
    }

    onCloseConfigModal() {
        this.props.closeConfigModal();
    }

    onSave() {
        this.setState({loading: true});
        this.props.saveConfig(this.state);
    }

    render() {

        var quotes = this.getQuotes();
        var availTones = this.getAvailableTones();

        var {
            selectedAssetBase,
            selectedAssetQuote,
            liquidity,
            selectedExchange = [],
            assetBase,
            exchange,
            selectedTone,
            filterOpportunity,
            loading
        } = this.state;

        return (
            <div className="panel panel-default text-left x-bg-tile">
                <div className="panel-heading excoin-color-light">
                    <h4 className="font-bold">Settings</h4>
                </div>
                <div className="panel-body">
                    <div className="panel with-nav-tabs panel-default">
                        <div className="panel-heading border-bottom-0">
                            <ul className="nav nav-tabs">
                                <li className="active"><a href="#tab1default" data-toggle="tab">Data Exchange</a></li>
                                <li><a href="#tab2default" data-toggle="tab">Notification</a></li>
                            </ul>
                        </div>
                        <div className="panel-body">
                            <div className="tab-content excoin-padding-20">
                                <div className="tab-pane fade in active" id="tab1default">
                                <div className="form-group">
                                    <label className="font-italic">Enter liquidity (USD)</label>
                                    <input name="liquidity" type="number" value={liquidity} onChange={this.onChange.bind(this)} className="form-control input-sm" />
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label className="font-italic">Select Base</label>
                                            <select name="selectedAssetBase" value={selectedAssetBase} className="form-control input-sm" onChange={this.onChange.bind(this)}>
                                                <option defaultValue>--</option>
                                                {assetBase.map(asset =>
                                                    <option key={asset.asset_id} value={asset.asset_id}>{asset.name}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="font-italic">Select Quotes</label>
                                            <select name="selectedAssetQuote" value={selectedAssetQuote} className="form-control input-sm" onChange={this.onChange.bind(this)}>
                                                <option defaultValue>--</option>
                                                {quotes.map(quote =>
                                                    <option key={quote} value={quote}>{quote}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="font-italic">List of Exchanges</label>
                                    <Select
                                        closeOnSelect={false}
                                        disabled={false}
                                        onChange={this.onSelectChange.bind(this)}
                                        multi
                                        options={exchange}
                                        simpleValue
                                        value={selectedExchange}
                                    />
                                    <small className="font-italic">it will only display 5 exchanges in coin data grid</small>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="tab2default">
                                    <div className="form-group">
                                        <label className="font-italic">Filter Opportunity</label>
                                        <input name="filterOpportunity" type="number" value={filterOpportunity} onChange={this.onChange.bind(this)} className="form-control input-sm" />
                                        <small className="font-italic">Play sound when opportunity hits the entered value</small>
                                    </div>
                                    <div className="form-group">
                                        <label className="font-italic">Select a Tone</label>
                                        <select name="selectedTone" value={selectedTone} className="form-control input-sm" onChange={this.onChange.bind(this)}>
                                            <option defaultValue>--</option>
                                            {availTones.map((tone, index) =>
                                                <option key={index} value={tone.path}>{tone.name}</option>
                                            )}
                                        </select>
                                        <small className="font-italic">Select a tone to be used as a sound for filtering opportunity</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-footer text-muted text-center">
                    <button disabled={loading} href="#" className="btn dream-btn margin-top-5" onClick={this.onSave.bind(this)}>
                        {loading && (<i className="fa fa-spinner fa-spin" />)} SAVE
                    </button>
                    {'  '}
                    <button href="#" className="btn dream-btn margin-top-5" onClick={this.onCloseConfigModal.bind(this)}>CLOSE</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    metadata: state.metadata
});

export default connect(mapStateToProps, {  })(ModalSettings);