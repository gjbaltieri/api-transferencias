"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_token_adapter_1 = require("../../infra/cryptography/token/jwt-token-adapter");
const http_helper_1 = require("../../presentation/helper/http/http-helper");
const jwt = new jwt_token_adapter_1.JwtTokenAdapter(process.env.JWT_SECRET);
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw res.json((0, http_helper_1.unauthorized)());
    }
    const [, token] = authHeader.split(' ');
    try {
        const isValidToken = jwt.verify(token);
        req.user = {
            username: isValidToken.username,
            accountId: isValidToken.accountId,
            balance: isValidToken.balance
        };
        return next();
    }
    catch (error) {
        console.error(error);
        throw res.json((0, http_helper_1.unauthorized)());
    }
}
exports.default = isAuthenticated;
