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
exports.TransferValueRepository = void 0;
const Account_1 = require("../../typeorm/entities/Account");
const Transaction_1 = require("../../typeorm/entities/Transaction");
class TransferValueRepository {
    constructor(repository) {
        this.repository = repository;
    }
    execute({ creditedAccountId, debitedAccountId }, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionRepository = this.repository.get(Transaction_1.Transaction);
            const accountRepository = this.repository.get(Account_1.Account);
            const debitedAccount = yield accountRepository.findOneBy({ id: debitedAccountId });
            const creditedAccount = yield accountRepository.findOneBy({ id: creditedAccountId });
            debitedAccount.balance = Number(debitedAccount.balance) - Number(value);
            creditedAccount.balance = Number(creditedAccount.balance) + Number(value);
            yield accountRepository.update({ id: debitedAccountId }, { balance: debitedAccount.balance });
            yield accountRepository.update({ id: creditedAccountId }, { balance: creditedAccount.balance });
            const createTransaction = transactionRepository.create({
                creditedAccountId,
                debitedAccountId,
                value
            });
            return yield transactionRepository.save(createTransaction);
        });
    }
}
exports.TransferValueRepository = TransferValueRepository;
