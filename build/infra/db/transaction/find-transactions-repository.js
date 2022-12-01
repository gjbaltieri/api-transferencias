"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindTransactionsRepository = void 0;
const custom_repository_1 = require("../../typeorm/custom/custom-repository");
const change_object_key_1 = require("./helper/change-object-key");
class FindTransactionsRepository {
    constructor(repository) {
        this.repository = repository;
    }
    findAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, accountId, limit, skip } = params;
            const findTransactions = yield custom_repository_1.customTransactionsRepository.findAllTransactions(date, accountId, limit, skip);
            const transactionsCredited = [];
            const transactionsReceived = [];
            findTransactions.map((transaction) => {
                transactionsCredited.push(transaction.creditedAccountId.id);
                transactionsReceived.push(transaction.debitedAccountId.id);
            });
            const usersSend = yield custom_repository_1.customUserRepository.findUsernameByAccountId(transactionsReceived);
            const usersCredited = yield custom_repository_1.customUserRepository.findUsernameByAccountId(transactionsCredited);
            (0, change_object_key_1.debitedAccountIdKeyToUsername)(usersSend, findTransactions);
            (0, change_object_key_1.creditedIdKeyToUsername)(usersCredited, findTransactions);
            return findTransactions;
        });
    }
    findSend(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, accountId, limit, skip } = params;
            const findSendTransactions = yield custom_repository_1.customTransactionsRepository.findSendTransactions(date, accountId, limit, skip);
            const transactionsCredited = [];
            const transactionsReceived = [];
            findSendTransactions.map((transaction) => {
                transactionsCredited.push(transaction.creditedAccountId.id);
                transactionsReceived.push(transaction.debitedAccountId.id);
            });
            const usersSend = yield custom_repository_1.customUserRepository.findUsernameByAccountId(transactionsReceived);
            const usersCredited = yield custom_repository_1.customUserRepository.findUsernameByAccountId(transactionsCredited);
            (0, change_object_key_1.debitedAccountIdKeyToUsername)(usersSend, findSendTransactions);
            (0, change_object_key_1.creditedIdKeyToUsername)(usersCredited, findSendTransactions);
            return findSendTransactions;
        });
    }
    findReceived(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, accountId, limit, skip } = params;
            const findReceivedTransactions = yield custom_repository_1.customTransactionsRepository.findReceivedTransactions(date, accountId, limit, skip);
            const transactionsCredited = [];
            const transactionsReceived = [];
            findReceivedTransactions.map((transaction) => {
                transactionsCredited.push(transaction.creditedAccountId.id);
                transactionsReceived.push(transaction.debitedAccountId.id);
            });
            const usersSend = yield custom_repository_1.customUserRepository.findUsernameByAccountId(transactionsReceived);
            const usersCredited = yield custom_repository_1.customUserRepository.findUsernameByAccountId(transactionsCredited);
            (0, change_object_key_1.debitedAccountIdKeyToUsername)(usersSend, findReceivedTransactions);
            (0, change_object_key_1.creditedIdKeyToUsername)(usersCredited, findReceivedTransactions);
            return findReceivedTransactions;
        });
    }
}
exports.FindTransactionsRepository = FindTransactionsRepository;
