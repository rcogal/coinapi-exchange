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
var CoinApiService_1 = require("../../services/CoinApiService");
var BaseController_1 = require("../BaseController");
var ExchangeController = /** @class */ (function (_super) {
    __extends(ExchangeController, _super);
    function ExchangeController() {
        var _this = _super.call(this) || this;
        _this.path = '/v1/exchanges/';
        _this.coinapiService = new CoinApiService_1.CoinApiService();
        return _this;
    }
    ExchangeController.prototype.get = function () {
        var _this = this;
        return this.coinapiService.getResource(this.path)
            .then(function (exchanges) { return _this.json(true, exchanges); })
            .catch(function (err) { return _this.json(false, [], err); });
    };
    return ExchangeController;
}(BaseController_1.BaseController));
exports.ExchangeController = ExchangeController;
//# sourceMappingURL=ExchangeController.js.map