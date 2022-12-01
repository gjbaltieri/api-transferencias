"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindReceivedTransactionController = void 0;
const http_helper_1 = require("../../../helper/http/http-helper");
class FindReceivedTransactionController {
    constructor(findTransactions) {
        this.findTransactions = findTransactions;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accountId } = httpRequest.user;
                const { date } = httpRequest.body;
                const { limit, skip } = httpRequest.query;
                Number(limit), Number(skip);
                const transactions = yield this.findTransactions.findReceived({ date, accountId, limit, skip });
                return (0, http_helper_1.ok)(transactions);
            }
            catch (error) {
                console.error(error);
                return (0, http_helper_1.serverError)();
            }
        });
    }
}
exports.FindReceivedTransactionController = FindReceivedTransactionController;
