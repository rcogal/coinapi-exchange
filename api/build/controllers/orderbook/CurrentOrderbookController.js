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
        _this.allowedQuotes = ['USD', 'EUR', 'GBP'];
        _this.coinapiService = new CoinApiService_1.CoinApiService();
        return _this;
    }
    CurrentOrderbookController.prototype.get = function (symbols) {
        var _this = this;
        return this.coinapiService.getResource(this.path + "?filter_symbol_id=" + symbols)
            .then(function (orderbooks) {
            return _this.json(true, orderbooks);
        })
            .catch(function (err) { return _this.json(false, [], err); });
    };
    CurrentOrderbookController.prototype.getCurrentBookResource = function (exchangeInfo) {
        var _this = this;
        var extraInfo = {
            rate: exchangeInfo.rate || 1,
            liquidity: exchangeInfo.liquidity || 0
        };
        return this.get(exchangeInfo.symbolIds)
            .then(function (results) {
            if (results.success === true) {
                return _this.json(true, _this.getCurrentOrderbookFilter(results.result, extraInfo));
            }
            else {
                return results;
            }
        });
    };
    CurrentOrderbookController.prototype.getLiquidity = function (price, size) {
        return price * size;
    };
    CurrentOrderbookController.prototype.getCurrentLiquidity = function (exchangeTypes, extraInfo) {
        var _this = this;
        var rate = extraInfo.rate, liquidity = extraInfo.liquidity;
        return _.find(exchangeTypes, function (item) {
            return _this.getLiquidity(item.price * rate, item.size) > liquidity;
        });
    };
    CurrentOrderbookController.prototype.getCurrentOrderbookFilter = function (orderbooks, extraParams) {
        var exchangeBids = [];
        var exchagneAsks = [];
        var liquidity = extraParams.liquidity, rate = extraParams.rate;
        var me = this;
        _.each(orderbooks, function (orderbook) {
            var symbol_id = orderbook.symbol_id, asks = orderbook.asks, bids = orderbook.bids;
            var symbol = symbol_id.split('_');
            var exchange = symbol[0]; // get the current 0 index for the name of current exchange
            var quote = symbol[symbol.length - 1];
            var ask = me.getCurrentLiquidity(asks, extraParams);
            var bid = me.getCurrentLiquidity(bids, extraParams);
            if (ask) {
                var askPrice = ask.price * rate;
                exchagneAsks.push({
                    price: askPrice,
                    size: ask.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(askPrice, ask.size)
                });
            }
            if (bid) {
                var bidPrice = bid.price * rate;
                exchangeBids.push({
                    price: bidPrice,
                    size: bid.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(bidPrice, bid.size)
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