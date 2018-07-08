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
var ExchangeRateController = /** @class */ (function (_super) {
    __extends(ExchangeRateController, _super);
    function ExchangeRateController() {
        var _this = _super.call(this) || this;
        _this.path = 'v1/exchangerate';
        _this.coinapiService = new CoinApiService_1.CoinApiService();
        return _this;
    }
    ExchangeRateController.prototype.getRate = function (base, quote) {
        var _this = this;
        var resource = this.path + "/" + base + "/" + quote;
        return this.coinapiService.getResource(resource)
            .then(function (exchangerate) { return _this.json(true, exchangerate); })
            .catch(function (err) { return _this.json(false, [], err); });
    };
    return ExchangeRateController;
}(BaseController_1.BaseController));
exports.ExchangeRateController = ExchangeRateController;
//# sourceMappingURL=ExchangeRateController.js.map