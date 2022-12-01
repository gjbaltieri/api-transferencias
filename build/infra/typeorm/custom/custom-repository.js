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
exports.customUserRepository = exports.customTransactionsRepository = void 0;
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../../main/data-source");
const Transaction_1 = require("../entities/Transaction");
const User_1 = require("../entities/User");
const addMs = (date) => {
    if (date === '1999-01-01' || date.length <= 1) {
        console.log('data antes', date);
        date === '1999-01-01';
        console.log('data depois', date);
        const addy = (0, date_fns_1.addYears)(new Date(date), 100);
        return addy;
    }
    const addms = (0, date_fns_1.addMilliseconds)(new Date(date), 86399999);
    return addms;
};
exports.customTransactionsRepository = data_source_1.appDataSource.getRepository(Transaction_1.Transaction).extend({
    findAllTransactions(date = '1999-01-01', accountId, limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                relations: {
                    debitedAccountId: true,
                    creditedAccountId: true
                },
                where: [
                    {
                        debitedAccountId: {
                            id: accountId
                        },
                        created_At: (0, typeorm_1.Between)(new Date(date), addMs(date))
                    },
                    {
                        creditedAccountId: {
                            id: accountId
                        },
                        created_At: (0, typeorm_1.Between)(new Date(date), addMs(date))
                    }
                ],
                skip: skip,
                take: limit,
                select: {
                    creditedAccountId: {
                        id: true
                    },
                    debitedAccountId: {
                        id: true
                    }
                },
                order: {
                    created_At: 'DESC'
                }
            });
        });
    },
    findSendTransactions(date = '1999-01-01', accountId, limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                relations: {
                    debitedAccountId: true,
                    creditedAccountId: true
                },
                where: {
                    debitedAccountId: {
                        id: accountId
                    },
                    created_At: (0, typeorm_1.Between)(new Date(date), addMs(date))
                },
                skip: skip,
                take: limit,
                select: {
                    creditedAccountId: {
                        id: true
                    },
                    debitedAccountId: {
                        id: true
                    }
                },
                order: {
                    created_At: 'DESC'
                }
            });
        });
    },
    findReceivedTransactions(date = '1999-01-01', accountId, limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                relations: {
                    debitedAccountId: true,
                    creditedAccountId: true
                },
                where: {
                    creditedAccountId: {
                        id: accountId
                    },
                    created_At: (0, typeorm_1.Between)(new Date(date), addMs(date))
                },
                skip: skip,
                take: limit,
                select: {
                    creditedAccountId: {
                        id: true
                    },
                    debitedAccountId: {
                        id: true
                    }
                },
                order: {
                    created_At: 'DESC'
                }
            });
        });
    }
});
exports.customUserRepository = data_source_1.appDataSource.getRepository(User_1.User).extend({
    findUsernameByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                relations: {
                    accountId: true
                },
                where: {
                    accountId: {
                        id: (0, typeorm_1.In)(accountId)
                    }
                }
            });
        });
    }
});
