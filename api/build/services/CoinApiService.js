"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var CoinApiService = /** @class */ (function () {
    function CoinApiService() {
        this.baseUrl = 'https://rest.coinapi.io';
        this.apiKey = 'FA49C145-2663-48E9-BFF7-FF085C4F1CE9';
        this.axios = axios_1.default;
    }
    Object.defineProperty(CoinApiService.prototype, "axiosInstance", {
        get: function () {
            return this.axios.create({
                baseURL: this.baseUrl,
                headers: {
                    'X-CoinAPI-Key': this.apiKey
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    CoinApiService.prototype.getResource = function (resource) {
        return this.axiosInstance.get(resource)
            .then(function (response) { return response; })
            .catch(function (err) { return err.response; });
    };
    return CoinApiService;
}());
exports.CoinApiService = CoinApiService;
//# sourceMappingURL=CoinApiService.js.map