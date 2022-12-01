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
exports.LoginController = void 0;
const invalid_param_error_1 = require("../../errors/invalid-param-error");
const http_helper_1 = require("../../helper/http/http-helper");
class LoginController {
    constructor(RequiredFieldValidation, acessAccount) {
        this.RequiredFieldValidation = RequiredFieldValidation;
        this.acessAccount = acessAccount;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fieldValidator = this.RequiredFieldValidation.signupCompare(httpRequest.body);
                if (fieldValidator) {
                    return (0, http_helper_1.badRequest)(fieldValidator);
                }
                const { username, password } = httpRequest.body;
                const acessToken = yield this.acessAccount.login({ username, password });
                if (!acessToken) {
                    return (0, http_helper_1.badRequest)(new invalid_param_error_1.InvalidParamError('username or password is wrong.'));
                }
                return (0, http_helper_1.ok)({ token: acessToken });
            }
            catch (error) {
                console.error(error);
                return (0, http_helper_1.serverError)();
            }
        });
    }
}
exports.LoginController = LoginController;
