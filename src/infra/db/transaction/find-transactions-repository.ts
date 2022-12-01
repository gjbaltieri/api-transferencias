import { FindTransactions, findTransactionsModel } from '../../../domain/usecases/find-transactions'
import { RepositoryModel } from '../../../domain/usecases/repository-model'
import { customTransactionsRepository, customUserRepository } from '../../typeorm/custom/custom-repository'
import { creditedIdKeyToUsername, debitedAccountIdKeyToUsername } from './helper/change-object-key'

export class FindTransactionsRepository implements FindTransactions {
  constructor(private readonly repository: RepositoryModel) {}
  async findAll(params: findTransactionsModel): Promise<any[]> {
    const { date, accountId, limit, skip } = params
    const findTransactions = await customTransactionsRepository.findAllTransactions(date, accountId, limit, skip)
    const transactionsCredited: any[] = []
    const transactionsReceived: any[] = []
    findTransactions.map((transaction) => {
      transactionsCredited.push(transaction.creditedAccountId.id)
      transactionsReceived.push(transaction.debitedAccountId.id)
    })
    const usersSend = await customUserRepository.findUsernameByAccountId(transactionsReceived)
    const usersCredited = await customUserRepository.findUsernameByAccountId(transactionsCredited)
    debitedAccountIdKeyToUsername(usersSend, findTransactions)
    creditedIdKeyToUsername(usersCredited, findTransactions)
    return findTransactions
  }

  async findSend(params: findTransactionsModel): Promise<any[]> {
    const { date, accountId, limit, skip } = params
    const findSendTransactions = await customTransactionsRepository.findSendTransactions(date, accountId, limit, skip)
    const transactionsCredited: any[] = []
    const transactionsReceived: any[] = []
    findSendTransactions.map((transaction) => {
      transactionsCredited.push(transaction.creditedAccountId.id)
      transactionsReceived.push(transaction.debitedAccountId.id)
    })
    const usersSend = await customUserRepository.findUsernameByAccountId(transactionsReceived)
    const usersCredited = await customUserRepository.findUsernameByAccountId(transactionsCredited)
    debitedAccountIdKeyToUsername(usersSend, findSendTransactions)
    creditedIdKeyToUsername(usersCredited, findSendTransactions)
    return findSendTransactions
  }

  async findReceived(params: findTransactionsModel): Promise<any[]> {
    const { date, accountId, limit, skip } = params
    const findReceivedTransactions = await customTransactionsRepository.findReceivedTransactions(date, accountId, limit, skip)
    const transactionsCredited: any[] = []
    const transactionsReceived: any[] = []
    findReceivedTransactions.map((transaction) => {
      transactionsCredited.push(transaction.creditedAccountId.id)
      transactionsReceived.push(transaction.debitedAccountId.id)
    })
    const usersSend = await customUserRepository.findUsernameByAccountId(transactionsReceived)
    const usersCredited = await customUserRepository.findUsernameByAccountId(transactionsCredited)
    debitedAccountIdKeyToUsername(usersSend, findReceivedTransactions)
    creditedIdKeyToUsername(usersCredited, findReceivedTransactions)
    return findReceivedTransactions
  }
}
