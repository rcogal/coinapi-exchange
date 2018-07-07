"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseController_1 = require("../BaseController");
var CoinApiService_1 = require("../../services/CoinApiService");
var _ = require("underscore");
var CurrentOrderbookController = /** @class */ (function (_super) {
    __extends(CurrentOrderbookController, _super);
    function CurrentOrderbookController() {
        var _this = _super.call(this) || this;
        _this.path = 'v1/orderbooks/current';
        _this.displayLimit = 5;
        _this.coinapiService = new CoinApiService_1.CoinApiService();
        return _this;
    }
    CurrentOrderbookController.prototype.get = function (symbols, liquidity) {
        var _this = this;
        liquidity = liquidity || 0;
        return this.coinapiService.getResource(this.path + "?filter_symbol_id=" + symbols)
            .then(function (orderbooks) {
            return _this.json(true, _this.getCurrentOrderbookFilter(orderbooks, liquidity));
        })
            .catch(function (err) { return _this.json(false, [], err); });
    };
    CurrentOrderbookController.prototype.getLiquidity = function (price, size) {
        return price * size;
    };
    CurrentOrderbookController.prototype.getCurrentLiquidity = function (exchangeTypes, liquidity) {
        var _this = this;
        return _.find(exchangeTypes, function (item) {
            return _this.getLiquidity(item.price, item.size) > liquidity;
        });
    };
    CurrentOrderbookController.prototype.getCurrentOrderbookFilter = function (orderbooks, liquidity) {
        var exchangeBids = [];
        var exchagneAsks = [];
        var me = this;
        _.each(orderbooks, function (orderbook) {
            var symbol_id = orderbook.symbol_id, asks = orderbook.asks, bids = orderbook.bids;
            var exchange = symbol_id.split('_')[0]; // get the current 0 index for the name of current exchange
            var ask = me.getCurrentLiquidity(asks, liquidity);
            var bid = me.getCurrentLiquidity(bids, liquidity);
            if (ask) {
                exchagneAsks.push({
                    price: ask.price,
                    size: ask.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(ask.price, ask.size)
                });
            }
            if (bid) {
                exchangeBids.push({
                    price: bid.price,
                    size: bid.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(bid.price, bid.size)
                });
            }
        });
        return this.applyCurrentBookBestPrice(exchangeBids, exchagneAsks);
    };
    CurrentOrderbookController.prototype.sortBestPrice = function (items, dir) {
        items.sort(function (a, b) {
            return dir === 'asc' ? (a.price - b.price) : (b.price - a.price);
        });
        return items;
    };
    CurrentOrderbookController.prototype.sortBidPrices = function (bidPrices) {
        return this.sortBestPrice(bidPrices, 'desc');
    };
    CurrentOrderbookController.prototype.sortAskPrices = function (askPrices) {
        return this.sortBestPrice(askPrices, 'asc');
    };
    CurrentOrderbookController.prototype.applyCurrentBookBestPrice = function (bids, asks) {
        var maxSize = Math.max(bids.length, asks.length);
        var output = [];
        var i = 0;
        bids = this.sortBidPrices(bids);
        asks = this.sortAskPrices(asks);
        console.log(bids);
        while (i < maxSize) {
            var bid = bids[i] || {};
            var ask = asks[i] || {};
            if (this.displayLimit === i) {
                break;
            }
            output.push({
                bid_price: bid.price,
                bid_size: bid.size,
                bid_exchange: bid.exchange,
                bid_liquidity: bid.liquidity,
                ask_price: ask.price,
                ask_size: ask.size,
                ask_exchange: ask.exchange,
                ask_liquidity: ask.liquidity
            });
            i += 1;
        }
        return output;
    };
    return CurrentOrderbookController;
}(BaseController_1.BaseController));
exports.CurrentOrderbookController = CurrentOrderbookController;
//# sourceMappingURL=CurrentOrderbookController.js.map