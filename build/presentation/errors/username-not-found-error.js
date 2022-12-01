"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameNotFound = void 0;
class UsernameNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'UsernameNotFound';
    }
}
exports.UsernameNotFound = UsernameNotFound;
