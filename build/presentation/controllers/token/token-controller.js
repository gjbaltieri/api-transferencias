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
exports.TokenController = void 0;
const http_helper_1 = require("../../helper/http/http-helper");
class TokenController {
    constructor(tokenVerify, updateBalance) {
        this.tokenVerify = tokenVerify;
        this.updateBalance = updateBalance;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = httpRequest.body;
                const isValid = this.tokenVerify.verify(token);
                const verifyBalance = yield this.updateBalance.update(isValid.accountId);
                return (0, http_helper_1.ok)({ user: isValid, balance: verifyBalance });
            }
            catch (error) {
                console.error(error);
                return (0, http_helper_1.unauthorized)();
            }
        });
    }
}
exports.TokenController = TokenController;
