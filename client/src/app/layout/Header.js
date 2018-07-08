import React, { Component } from 'react';

class Header extends Component {
    onCreateTile() {
        this.props.createTile();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top py-0">
                <div className="container">
                    <div className="navbar-brand excoin-brandname">
                        <label className="excoin-label-secondary">Coin</label>
                        {' '}
                        <label className="excoin-label-primary">Exchange</label>
                    </div>
                    <button className="navbar-toggler mt-1" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end text-center" id="navbarCollapse">
                        <button href="#" className="btn dream-btn" onClick={this.onCreateTile.bind(this)}>Create Tile</button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;