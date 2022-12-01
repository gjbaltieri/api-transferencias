"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_adapter_1 = require("../helper/adapter/routes-adapter");
const make_signup_controller_1 = require("./make-signup-controller");
exports.default = (router) => {
    router.post('/signup', (0, routes_adapter_1.routeAdapter)((0, make_signup_controller_1.makeSignUpController)()));
};
