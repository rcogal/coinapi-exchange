"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AssetController_1 = require("../controllers/metadata/AssetController");
var ExchangeController_1 = require("../controllers/metadata/ExchangeController");
var CurrentOrderbookController_1 = require("../controllers/orderbook/CurrentOrderbookController");
var ExchangeRateController_1 = require("../controllers/rate/ExchangeRateController");
module.exports = function (app) {
    var assetResource = express_1.Router();
    var assetCtrlr = new AssetController_1.AssetController();
    // assets controller
    assetResource.get('/assets', function (req, res) {
        assetCtrlr.get().then(function (assets) { return res.json(assets); });
    });
    // exchange controller
    var exchangeResource = express_1.Router();
    var exchangeCtrlr = new ExchangeController_1.ExchangeController();
    exchangeResource.get('/exchanges', function (req, res) {
        exchangeCtrlr.get().then(function (exchanges) { return res.json(exchanges); });
    });
    // orderbook controller
    var orderbookResource = express_1.Router();
    var orderbookCtrlr = new CurrentOrderbookController_1.CurrentOrderbookController();
    var exchangeRateCtrlr = new ExchangeRateController_1.ExchangeRateController();
    orderbookResource
        .get('/orderbook/current/:filterSymboldId', function (req, res) {
        orderbookCtrlr.get(req.params.filterSymboldId)
            .then(function (orderbooks) { return res.json(orderbooks); });
    })
        .get('/orderbook/current/:baseQuote/:assetQuote/:symbolIds/:liquidity?', function (req, res) {
        var _a = req.params, baseQuote = _a.baseQuote, assetQuote = _a.assetQuote;
        var exchangeRate;
        if (baseQuote !== assetQuote) {
            exchangeRateCtrlr.getRate(assetQuote, baseQuote)
                .then(function (exchangeRate) {
                if (exchangeRate.success === true) {
                    req.params.rate = exchangeRate.result.rate;
                    orderbookCtrlr.getCurrentBookResource(req.params)
                        .then(function (orderbooks) { return res.json(orderbooks); });
                }
                else {
                    res.json("Something went wrong with getting the exchange rate " + assetQuote + "_" + baseQuote);
                }
            });
        }
        else {
            orderbookCtrlr.getCurrentBookResource(req.params)
                .then(function (orderbooks) { return res.json(orderbooks); });
        }
    });
    // register routes
    app.use('/api/v1', assetResource);
    app.use('/api/v1', exchangeResource);
    app.use('/api/v1', orderbookResource);
};
//# sourceMappingURL=webapi-routes.js.map