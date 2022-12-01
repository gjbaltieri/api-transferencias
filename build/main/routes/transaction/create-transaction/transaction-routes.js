"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../../../middlewares/authentication"));
const routes_adapter_1 = require("../../helper/adapter/routes-adapter");
const make_transaction_controller_1 = require("./make-transaction-controller");
exports.default = (router) => {
    router.post('/transfer', authentication_1.default, (0, routes_adapter_1.routeAdapter)((0, make_transaction_controller_1.makeTransactionController)()));
};
