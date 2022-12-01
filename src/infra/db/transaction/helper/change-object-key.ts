import { Transaction } from '../../../typeorm/entities/Transaction'

export const debitedAccountIdKeyToUsername = (usersSend: any[], transactions: Transaction[]) => {
  return usersSend.map((send) => {
    for (let i in transactions) {
      if (send.accountId.id === transactions[i].debitedAccountId.id) {
        const { debitedAccountId } = transactions[i]
        debitedAccountId.id = send.username
        Object.assign(transactions[i].debitedAccountId, { ['username']: transactions[i].debitedAccountId['id'] })['id']
        delete transactions[i].debitedAccountId.id
      }
    }
  })
}

export const creditedIdKeyToUsername = (usersSend: any[], transactions: Transaction[]) => {
  return usersSend.map((send) => {
    for (let i in transactions) {
      if (send.accountId.id === transactions[i].creditedAccountId.id) {
        const { creditedAccountId } = transactions[i]
        creditedAccountId.id = send.username
        Object.assign(transactions[i].creditedAccountId, { ['username']: transactions[i].creditedAccountId['id'] })['id']
        delete transactions[i].creditedAccountId.id
      }
    }
  })
}
