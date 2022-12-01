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
exports.AccountTypeORMRepository = void 0;
const Account_1 = require("../../typeorm/entities/Account");
const User_1 = require("../../typeorm/entities/User");
class AccountTypeORMRepository {
    constructor(repository, hasher) {
        this.repository = repository;
        this.hasher = hasher;
    }
    add(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.repository.get(User_1.User);
            const accountRepository = this.repository.get(Account_1.Account);
            const userExists = yield userRepository.findOneBy({ username: account.username });
            if (!userExists) {
                const createUser = userRepository.create({
                    username: account.username,
                    password: yield this.hasher.hash(account.password)
                });
                const saveAccount = yield accountRepository.save({});
                createUser.accountId = saveAccount.id;
                return yield userRepository.save(createUser);
            }
            return;
        });
    }
}
exports.AccountTypeORMRepository = AccountTypeORMRepository;
