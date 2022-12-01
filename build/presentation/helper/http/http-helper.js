"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionFailed = exports.conflict = exports.ok = exports.serverError = exports.unauthorized = exports.badRequest = void 0;
const server_error_1 = require("../../errors/server-error");
const unauthorized_error_1 = require("../../errors/unauthorized-error");
const badRequest = (error) => {
    return {
        statusCode: 400,
        body: error
    };
};
exports.badRequest = badRequest;
const unauthorized = () => ({
    statusCode: 401,
    body: new unauthorized_error_1.UnauthorizedError('Unauthorized')
});
exports.unauthorized = unauthorized;
const serverError = (error) => {
    return {
        statusCode: 500,
        body: new server_error_1.ServerError((error === null || error === void 0 ? void 0 : error.stack) || 'Server Error')
    };
};
exports.serverError = serverError;
const ok = (data) => {
    return {
        statusCode: 200,
        body: data
    };
};
exports.ok = ok;
const conflict = (error) => {
    return {
        statusCode: 409,
        body: error
    };
};
exports.conflict = conflict;
const conditionFailed = (error) => {
    return {
        statusCode: 412,
        body: error
    };
};
exports.conditionFailed = conditionFailed;
