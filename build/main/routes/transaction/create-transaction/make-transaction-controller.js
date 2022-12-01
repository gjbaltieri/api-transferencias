"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTransactionController = void 0;
const repository_adapter_1 = require("../../../../infra/db/helper/repository-adapter");
const balance_verify_repository_1 = require("../../../../infra/db/verify/balance-verify-repository");
const transfer_value_repository_1 = require("../../../../infra/db/verify/transfer-value-repository");
const user_verify_repository_1 = require("../../../../infra/db/verify/user-verify-repository");
const transaction_controller_1 = require("../../../../presentation/controllers/transaction/transaction-controller");
const required_fields_1 = require("../../../../presentation/helper/fields/required-fields");
const makeTransactionController = () => {
    const repositoryAdapter = new repository_adapter_1.RepositoryAdapter();
    const userVerify = new user_verify_repository_1.UserVerifyRepository(repositoryAdapter);
    const requiredFields = new required_fields_1.RequiredFieldValidation();
    const balanceVerify = new balance_verify_repository_1.BalanceVerifyRepository(repositoryAdapter);
    const transferValue = new transfer_value_repository_1.TransferValueRepository(repositoryAdapter);
    return new transaction_controller_1.TransactionController(requiredFields, userVerify, balanceVerify, transferValue);
};
exports.makeTransactionController = makeTransactionController;
