import { TransactionModel } from '../models/db/transfer-model'

export interface findTransactionsModel {
  accountId: string
  limit: number
  skip: number
  date: string
}

export interface FindTransactions {
  findAll(params: findTransactionsModel): Promise<TransactionModel[]>
  findSend(params: findTransactionsModel): Promise<any[]>
  findReceived(params: findTransactionsModel): Promise<any[]>
}
