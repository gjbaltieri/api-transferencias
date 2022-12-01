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
exports.AcessAccountRepository = void 0;
const User_1 = require("../../typeorm/entities/User");
class AcessAccountRepository {
    constructor(compareHash, repository, jwtToken) {
        this.compareHash = compareHash;
        this.repository = repository;
        this.jwtToken = jwtToken;
    }
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.repository.get(User_1.User);
            const userExists = yield userRepository.findOne({
                where: {
                    username: params.username
                },
                relations: {
                    accountId: true
                }
            });
            if (!userExists) {
                return;
            }
            const comparePassword = yield this.compareHash.compare(params.password, userExists.password);
            if (!comparePassword) {
                return;
            }
            const accessToken = this.jwtToken.gen({
                accountId: userExists.accountId.id,
                username: userExists.username,
                balance: userExists.accountId.balance
            });
            return accessToken;
        });
    }
}
exports.AcessAccountRepository = AcessAccountRepository;
