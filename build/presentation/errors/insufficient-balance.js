"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientBalance = void 0;
class InsufficientBalance extends Error {
    constructor(invalidParam) {
        super(`Invalid action: ${invalidParam}`);
        this.name = 'InsufficientBalance';
    }
}
exports.InsufficientBalance = InsufficientBalance;
