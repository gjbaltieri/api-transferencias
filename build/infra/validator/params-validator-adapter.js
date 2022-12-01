"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsValidatorAdapter = void 0;
const validator_1 = __importDefault(require("validator"));
const invalid_param_error_1 = require("../../presentation/errors/invalid-param-error");
class ParamsValidatorAdapter {
    validate(params) {
        const userName = validator_1.default.isLength(params.username, { min: 3 });
        if (!userName) {
            return new invalid_param_error_1.InvalidParamError('Username must contain at least 3 characters.');
        }
        const password = validator_1.default.isStrongPassword(params.password, { minLength: 8, minUppercase: 1, minNumbers: 1 });
        if (!password) {
            return new invalid_param_error_1.InvalidParamError('The password must contain at least 8 characters, at least one uppercase and one number.');
        }
    }
}
exports.ParamsValidatorAdapter = ParamsValidatorAdapter;
