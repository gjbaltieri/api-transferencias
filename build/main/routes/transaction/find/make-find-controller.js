"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindSendTransactionController = exports.makeFindReceivedTransactionController = exports.makeFindAllTransactionController = void 0;
const repository_adapter_1 = require("../../../../infra/db/helper/repository-adapter");
const find_transactions_repository_1 = require("../../../../infra/db/transaction/find-transactions-repository");
const find_received_transaction_controller_1 = require("../../../../presentation/controllers/transaction/find/find-received-transaction-controller");
const find_send_transaction_controller_1 = require("../../../../presentation/controllers/transaction/find/find-send-transaction-controller");
const find_transaction_controller_1 = require("../../../../presentation/controllers/transaction/find/find-transaction-controller");
const makeFindAllTransactionController = () => {
    const repositoryAdapter = new repository_adapter_1.RepositoryAdapter();
    const findTransactionsRepository = new find_transactions_repository_1.FindTransactionsRepository(repositoryAdapter);
    return new find_transaction_controller_1.FindTransactionController(findTransactionsRepository);
};
exports.makeFindAllTransactionController = makeFindAllTransactionController;
const makeFindReceivedTransactionController = () => {
    const repositoryAdapter = new repository_adapter_1.RepositoryAdapter();
    const findTransactionsRepository = new find_transactions_repository_1.FindTransactionsRepository(repositoryAdapter);
    return new find_received_transaction_controller_1.FindReceivedTransactionController(findTransactionsRepository);
};
exports.makeFindReceivedTransactionController = makeFindReceivedTransactionController;
const makeFindSendTransactionController = () => {
    const repositoryAdapter = new repository_adapter_1.RepositoryAdapter();
    const findTransactionsRepository = new find_transactions_repository_1.FindTransactionsRepository(repositoryAdapter);
    return new find_send_transaction_controller_1.FindSendTransactionController(findTransactionsRepository);
};
exports.makeFindSendTransactionController = makeFindSendTransactionController;
