"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTokenController = void 0;
const jwt_token_adapter_1 = require("../../../infra/cryptography/token/jwt-token-adapter");
const update_balance_1 = require("../../../infra/db/balance/update-balance");
const repository_adapter_1 = require("../../../infra/db/helper/repository-adapter");
const token_controller_1 = require("../../../presentation/controllers/token/token-controller");
const makeTokenController = () => {
    const jwtValidation = new jwt_token_adapter_1.JwtTokenAdapter(process.env.JWT_SECRET);
    const repositoryAdapter = new repository_adapter_1.RepositoryAdapter();
    const updateBalance = new update_balance_1.UpdateBalanceRepository(repositoryAdapter);
    return new token_controller_1.TokenController(jwtValidation, updateBalance);
};
exports.makeTokenController = makeTokenController;
