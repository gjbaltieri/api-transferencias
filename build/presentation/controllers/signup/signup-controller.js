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
exports.signUpController = void 0;
const username_already_exists_1 = require("../../errors/username-already-exists");
const http_helper_1 = require("../../helper/http/http-helper");
class signUpController {
    constructor(addAccount, requiredFieldValidation, paramsValidator) {
        this.addAccount = addAccount;
        this.requiredFieldValidation = requiredFieldValidation;
        this.paramsValidator = paramsValidator;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fieldValidator = this.requiredFieldValidation.signupCompare(httpRequest.body);
                if (fieldValidator) {
                    return (0, http_helper_1.badRequest)(fieldValidator);
                }
                const { username, password } = httpRequest.body;
                const paramsValidator = this.paramsValidator.validate({ username, password });
                if (paramsValidator) {
                    return (0, http_helper_1.badRequest)(paramsValidator);
                }
                const addAccount = yield this.addAccount.add({ username, password });
                if (!addAccount) {
                    return (0, http_helper_1.conflict)(new username_already_exists_1.UsernameAlreadyExists('Username already exists'));
                }
                return (0, http_helper_1.ok)(addAccount);
            }
            catch (error) {
                console.error(error);
                return (0, http_helper_1.serverError)();
            }
        });
    }
}
exports.signUpController = signUpController;
