"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_adapter_1 = require("../helper/adapter/routes-adapter");
const make_update_balance_controller_1 = require("./make-update-balance-controller");
exports.default = (router) => {
    router.post('/token', (0, routes_adapter_1.routeAdapter)((0, make_update_balance_controller_1.makeTokenController)()));
};
