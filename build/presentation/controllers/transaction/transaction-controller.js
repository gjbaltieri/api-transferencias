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
exports.TransactionController = void 0;
const http_helper_1 = require("../../helper/http/http-helper");
class TransactionController {
    constructor(requiredFieldValidation, userVerify, balanceVerify, transferValue) {
        this.requiredFieldValidation = requiredFieldValidation;
        this.userVerify = userVerify;
        this.balanceVerify = balanceVerify;
        this.transferValue = transferValue;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fieldValidator = this.requiredFieldValidation.transactionCompare(httpRequest.body);
                if (fieldValidator) {
                    return (0, http_helper_1.badRequest)(fieldValidator);
                }
                const { username, value } = httpRequest.body;
                const userVerify = yield this.userVerify.verify(username, httpRequest.user.username);
                if (userVerify instanceof Error) {
                    return (0, http_helper_1.conditionFailed)(userVerify);
                }
                const balanceIsAvailable = yield this.balanceVerify.verify(userVerify.debitedAccountId, value);
                if (balanceIsAvailable instanceof Error) {
                    return (0, http_helper_1.conditionFailed)(balanceIsAvailable);
                }
                httpRequest.user.balance = balanceIsAvailable;
                const transferValue = yield this.transferValue.execute(userVerify, value);
                const data = Object.assign(Object.assign({}, transferValue), { balance: balanceIsAvailable });
                return (0, http_helper_1.ok)(data);
            }
            catch (error) {
                return (0, http_helper_1.serverError)();
            }
        });
    }
}
exports.TransactionController = TransactionController;
