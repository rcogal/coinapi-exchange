import React, { Component } from 'react';

class Header extends Component {
    onCreateTile() {
        this.props.createTile();
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="col-sm-6">
                        <div className="navbar-header">
                            <span className="navbar-brand excoin-brandname">
                                <label className="excoin-label-secondary">Coin</label>
                                {' '}
                                <label className="excoin-label-primary">Exchange</label>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <button href="#" className="btn dream-btn" onClick={this.onCreateTile.bind(this)}>Create Tile</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;