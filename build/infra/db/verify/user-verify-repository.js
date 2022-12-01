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
exports.UserVerifyRepository = void 0;
const invalid_param_error_1 = require("../../../presentation/errors/invalid-param-error");
const username_not_found_error_1 = require("../../../presentation/errors/username-not-found-error");
const User_1 = require("../../typeorm/entities/User");
class UserVerifyRepository {
    constructor(repository) {
        this.repository = repository;
    }
    verify(usernameToReceive, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.repository.get(User_1.User);
            const usernameToReceiveValue = yield userRepository.findOne({
                where: {
                    username: usernameToReceive
                },
                relations: {
                    accountId: true
                }
            });
            if (!usernameToReceiveValue) {
                return new username_not_found_error_1.UsernameNotFound('Username not found.');
            }
            if (usernameToReceiveValue.username === username) {
                return new invalid_param_error_1.InvalidParamError('You cannot send to yourself.');
            }
            const usernameToSend = yield userRepository.findOne({
                where: {
                    username: username
                },
                relations: {
                    accountId: true
                }
            });
            return {
                creditedAccountId: usernameToReceiveValue.accountId.id,
                debitedAccountId: usernameToSend.accountId.id
            };
        });
    }
}
exports.UserVerifyRepository = UserVerifyRepository;
