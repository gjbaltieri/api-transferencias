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
exports.BalanceVerifyRepository = void 0;
const insufficient_balance_1 = require("../../../presentation/errors/insufficient-balance");
const Account_1 = require("../../typeorm/entities/Account");
class BalanceVerifyRepository {
    constructor(repository) {
        this.repository = repository;
    }
    verify(accountId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountRepository = this.repository.get(Account_1.Account);
            const { balance } = yield accountRepository.findOneBy({ id: accountId });
            if (balance <= value) {
                return new insufficient_balance_1.InsufficientBalance('your balance is insufficient for this transaction.');
            }
            const newBalance = balance - value;
            return newBalance;
        });
    }
}
exports.BalanceVerifyRepository = BalanceVerifyRepository;
