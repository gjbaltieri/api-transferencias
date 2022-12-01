"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../../../middlewares/authentication"));
const routes_adapter_1 = require("../../helper/adapter/routes-adapter");
const make_find_controller_1 = require("./make-find-controller");
exports.default = (router) => {
    router.post('/my-transfers', authentication_1.default, (0, routes_adapter_1.routeAdapter)((0, make_find_controller_1.makeFindAllTransactionController)()));
    router.post('/my-transfers/received', authentication_1.default, (0, routes_adapter_1.routeAdapter)((0, make_find_controller_1.makeFindReceivedTransactionController)()));
    router.post('/my-transfers/send', authentication_1.default, (0, routes_adapter_1.routeAdapter)((0, make_find_controller_1.makeFindSendTransactionController)()));
};
