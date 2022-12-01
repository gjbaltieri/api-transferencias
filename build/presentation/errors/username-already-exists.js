"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameAlreadyExists = void 0;
class UsernameAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyExists';
    }
}
exports.UsernameAlreadyExists = UsernameAlreadyExists;
