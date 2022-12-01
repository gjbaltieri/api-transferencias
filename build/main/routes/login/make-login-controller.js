"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = void 0;
const brypt_adapter_1 = require("../../../infra/cryptography/bcrypt/brypt-adapter");
const jwt_token_adapter_1 = require("../../../infra/cryptography/token/jwt-token-adapter");
const acess_account_repository_1 = require("../../../infra/db/account/acess-account-repository");
const repository_adapter_1 = require("../../../infra/db/helper/repository-adapter");
const login_controller_1 = require("../../../presentation/controllers/login/login-controller");
const required_fields_1 = require("../../../presentation/helper/fields/required-fields");
const makeLoginController = () => {
    const repositoryAdapter = new repository_adapter_1.RepositoryAdapter();
    const hasher = new brypt_adapter_1.BcryptAdapter(12);
    const jwt = new jwt_token_adapter_1.JwtTokenAdapter(process.env.JWT_SECRET);
    const addAccount = new acess_account_repository_1.AcessAccountRepository(hasher, repositoryAdapter, jwt);
    const requiredFields = new required_fields_1.RequiredFieldValidation();
    return new login_controller_1.LoginController(requiredFields, addAccount);
};
exports.makeLoginController = makeLoginController;
