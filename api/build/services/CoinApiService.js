"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var CoinApiService = /** @class */ (function () {
    function CoinApiService() {
        this.baseUrl = 'https://rest.coinapi.io';
        this.apiKey = 'FA49C145-2663-48E9-BFF7-FF085C4F1CE9';
        this.axios = axios_1.default;
    }
    CoinApiService.prototype.getAxios = function () {
        return this.axios.create({
            baseURL: this.baseUrl,
            headers: {
                'X-CoinAPI-Key': this.apiKey
            }
        });
    };
    CoinApiService.prototype.getResource = function (resource) {
        return this.getAxios().get(resource)
            .then(function (response) { return response.data; })
            .catch(function (err) { return err; });
    };
    return CoinApiService;
}());
exports.CoinApiService = CoinApiService;
//# sourceMappingURL=CoinApiService.js.map