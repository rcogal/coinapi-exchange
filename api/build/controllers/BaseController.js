"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Response_1 = require("./Response");
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    BaseController.prototype.json = function (error, data, message) {
        return new Response_1.Response(error, data, message || '');
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map