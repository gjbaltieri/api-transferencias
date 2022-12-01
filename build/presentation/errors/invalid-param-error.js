"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = void 0;
class InvalidParamError extends Error {
    constructor(invalidParam) {
        super(`Invalid param: ${invalidParam}`);
        this.name = 'InvalidParamError';
    }
}
exports.InvalidParamError = InvalidParamError;
