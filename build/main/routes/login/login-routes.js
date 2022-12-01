"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_adapter_1 = require("../helper/adapter/routes-adapter");
const make_login_controller_1 = require("./make-login-controller");
exports.default = (router) => {
    router.post('/login', (0, routes_adapter_1.routeAdapter)((0, make_login_controller_1.makeLoginController)()));
};
