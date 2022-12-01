"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
class MissingParamError extends Error {
    constructor(missingParam) {
        super(`Missin param: ${missingParam}`);
        this.name = 'MissingParamError';
    }
}
exports.MissingParamError = MissingParamError;
