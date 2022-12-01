"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
const missing_param_error_1 = require("../../errors/missing-param-error");
const joi_1 = __importDefault(require("joi"));
class RequiredFieldValidation {
    signupCompare(fieldsToCompare) {
        const schema = joi_1.default.object().keys({
            username: joi_1.default.required(),
            password: joi_1.default.required()
        });
        const isValid = schema.validate(fieldsToCompare);
        if (isValid.error) {
            const missingParam = isValid.error.details[0].path[0];
            return new missing_param_error_1.MissingParamError(missingParam);
        }
    }
    transactionCompare(fieldsToCompare) {
        const schema = joi_1.default.object().keys({
            username: joi_1.default.string().required(),
            value: joi_1.default.number().required().min(0.01).precision(2).message('The minimum value is 0.01 and two decimal places are accepted')
        });
        const isValid = schema.validate(fieldsToCompare, { convert: false });
        if (isValid.error) {
            const missingParam = isValid.error.details[0].message;
            console.log;
            return new missing_param_error_1.MissingParamError(missingParam);
        }
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
