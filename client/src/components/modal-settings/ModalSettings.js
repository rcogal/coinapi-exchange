import React, { Component } from 'react';
import { connect } from 'react-redux';
import toneResources from '../../resources';
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import "./ModalSettings.css";
import { toast, ToastContainer } from 'react-toastify';

class ModalSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            liquidity: 0,
            selectedAssetBase: null,
            selectedAssetQuote: null,
            selectedBaseQuote: null,
            selectedTone: '',
            filterOpportunity: 0,
            assetBase: [],
            exchange: [],
            selectedExchange: [],
            loading: false
        }

        this.quotes = [
            'USD', 'EUR', 'GBP'
        ];
    }

    componentWillMount() {

        const { asset, exchange } = this.props.metadata;
        const {
            selectedAssetBase,
            selectedAssetQuote,
            selectedExchange,
            selectedBaseQuote
        } = this.props;

        this.setState({
            selectedAssetBase,
            selectedAssetQuote,
            selectedExchange,
            selectedBaseQuote
        });

        if (asset.data.success === true) {
            this.setState({
                assetBase: asset.data.result
            });
        }

        if (exchange.data.success === true) {
            this.setState({
                exchange: exchange.data.result
            });
        }
    }

    getAvailableTones() {
        return toneResources;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCloseConfigModal() {
        this.props.closeConfigModal();
    }

    onSave() {

        const {selectedBaseQuote, selectedExchange, selectedAssetBase, selectedAssetQuote} = this.state;

        debugger;

        if (selectedBaseQuote && selectedExchange.length &&
                selectedAssetBase && selectedAssetQuote ) {
            this.setState({loading: true});
            this.props.saveConfig(this.state);
        } else {
            toast( 'Please fill all the required fields', {
                className: 'black-background',
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    onSelectBaseQuotation(value) {
        this.setState({ selectedBaseQuote: value });
    }

    onSelectAssetBase(value) {
        this.setState({ selectedAssetBase: value });
    }

    onSelectAssetQuote(value) {
        this.setState({ selectedAssetQuote: value });
    }

    onSelectExchange(value) {
        this.setState({ selectedExchange: value });
    }

    render() {
        var availTones = this.getAvailableTones();
        var {
            selectedAssetBase,
            selectedAssetQuote,
            selectedBaseQuote,
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
                                    <div className="container text-center">
                                        <div className="romels" style={{width: '130px', margin: '0 auto'}}>
                                            <Picky
                                                value={selectedBaseQuote}
                                                options={this.quotes}
                                                onChange={this.onSelectBaseQuotation.bind(this)}
                                                open={false}
                                                multiple={false}
                                                includeSelectAll={false}
                                                includeFilter={false}
                                                placeholder="Quote Conversion *"
                                                className="app-react-picky form-control quote-conversion"
                                                />
                                        </div>
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className="font-italic">List of Exchanges *</label>
                                        <Picky
                                            numberDisplayed={4}
                                            value={selectedExchange}
                                            options={exchange}
                                            onChange={this.onSelectExchange.bind(this)}
                                            open={false}
                                            valueKey="exchange_id"
                                            labelKey="name"
                                            multiple={true}
                                            includeSelectAll={true}
                                            includeFilter={false}
                                            placeholder=""
                                            className="app-react-picky form-control"
                                            />
                                        <small className="font-italic">it will only display 5 exchanges in coin data grid</small>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label className="font-italic">Select Base *</label>
                                                <Picky
                                                    value={selectedAssetBase}
                                                    options={assetBase}
                                                    onChange={this.onSelectAssetBase.bind(this)}
                                                    open={false}
                                                    valueKey="asset_id"
                                                    labelKey="name"
                                                    multiple={false}
                                                    includeSelectAll={false}
                                                    includeFilter={false}
                                                    placeholder=""
                                                    className="app-react-picky form-control"
                                                    />
                                            </div>
                                            <div className="col-sm-6">
                                                <label className="font-italic">Select Quote *</label>
                                                <Picky
                                                    value={selectedAssetQuote}
                                                    options={assetBase}
                                                    onChange={this.onSelectAssetQuote.bind(this)}
                                                    open={false}
                                                    valueKey="asset_id"
                                                    labelKey="name"
                                                    multiple={false}
                                                    includeSelectAll={false}
                                                    includeFilter={false}
                                                    placeholder=""
                                                    className="app-react-picky form-control"
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="font-italic">Enter liquidity</label>
                                        <input name="liquidity" type="number" value={liquidity} onChange={this.onChange.bind(this)} className="form-control input-sm" />
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
                    <button disabled={false} href="#" className="btn dream-btn margin-top-5" onClick={this.onSave.bind(this)}>
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