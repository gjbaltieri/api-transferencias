"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditedIdKeyToUsername = exports.debitedAccountIdKeyToUsername = void 0;
const debitedAccountIdKeyToUsername = (usersSend, transactions) => {
    return usersSend.map((send) => {
        for (let i in transactions) {
            if (send.accountId.id === transactions[i].debitedAccountId.id) {
                const { debitedAccountId } = transactions[i];
                debitedAccountId.id = send.username;
                Object.assign(transactions[i].debitedAccountId, { ['username']: transactions[i].debitedAccountId['id'] })['id'];
                delete transactions[i].debitedAccountId.id;
            }
        }
    });
};
exports.debitedAccountIdKeyToUsername = debitedAccountIdKeyToUsername;
const creditedIdKeyToUsername = (usersSend, transactions) => {
    return usersSend.map((send) => {
        for (let i in transactions) {
            if (send.accountId.id === transactions[i].creditedAccountId.id) {
                const { creditedAccountId } = transactions[i];
                creditedAccountId.id = send.username;
                Object.assign(transactions[i].creditedAccountId, { ['username']: transactions[i].creditedAccountId['id'] })['id'];
                delete transactions[i].creditedAccountId.id;
            }
        }
    });
};
exports.creditedIdKeyToUsername = creditedIdKeyToUsername;
