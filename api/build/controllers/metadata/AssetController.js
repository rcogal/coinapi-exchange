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
var AssetController = /** @class */ (function (_super) {
    __extends(AssetController, _super);
    function AssetController() {
        var _this = _super.call(this) || this;
        _this.path = '/v1/assets/';
        _this.coinapiService = new CoinApiService_1.CoinApiService();
        return _this;
    }
    AssetController.prototype.get = function () {
        var _this = this;
        return this.coinapiService.getResource(this.path)
            .then(function (assets) { return _this.json(true, assets); })
            .catch(function (err) { return _this.json(false, [], err); });
    };
    return AssetController;
}(BaseController_1.BaseController));
exports.AssetController = AssetController;
//# sourceMappingURL=AssetController.js.map