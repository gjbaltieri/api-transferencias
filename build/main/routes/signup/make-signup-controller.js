"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpController = void 0;
const brypt_adapter_1 = require("../../../infra/cryptography/bcrypt/brypt-adapter");
const add_account_repository_1 = require("../../../infra/db/account/add-account-repository");
const repository_adapter_1 = require("../../../infra/db/helper/repository-adapter");
const params_validator_adapter_1 = require("../../../infra/validator/params-validator-adapter");
const signup_controller_1 = require("../../../presentation/controllers/signup/signup-controller");
const required_fields_1 = require("../../../presentation/helper/fields/required-fields");
const makeSignUpController = () => {
    const repositoryAdapter = new repository_adapter_1.RepositoryAdapter();
    const hasher = new brypt_adapter_1.BcryptAdapter(12);
    const addAccount = new add_account_repository_1.AccountTypeORMRepository(repositoryAdapter, hasher);
    const validator = new params_validator_adapter_1.ParamsValidatorAdapter();
    const requiredFields = new required_fields_1.RequiredFieldValidation();
    return new signup_controller_1.signUpController(addAccount, requiredFields, validator);
};
exports.makeSignUpController = makeSignUpController;
