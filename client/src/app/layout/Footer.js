import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="app-footer">
                <div className="container-fluid" id="excoin-footer-primary">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-2">
                            <h4 className="font-bold">Get Started</h4>
                            <ul>
                                <li><a href="">Home</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-2">
                                <h4 className="font-bold">About Us</h4>
                                <ul>
                                    <li><a href="">Company Information</a></li>
                                    <li><a href="">Contact us</a></li>
                                </ul>
                        </div>
                        <div className="col-sm-2">
                            <h4 className="font-bold">Support</h4>
                            <ul>
                                <li><a href="">FAQ</a></li>
                                <li><a href="">Help desk</a></li>
                                <li><a href="">Forums</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
                <div className="copyright">
                    <h6 className="text-center"> Copyright © 2018. All rights reserved.</h6>
                </div>
            </footer>
        );
    }
}

export default Footer;