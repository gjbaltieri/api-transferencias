import { RepositoryAdapter } from '../../../../infra/db/helper/repository-adapter'
import { FindTransactionsRepository } from '../../../../infra/db/transaction/find-transactions-repository'
import { FindReceivedTransactionController } from '../../../../presentation/controllers/transaction/find/find-received-transaction-controller'
import { FindSendTransactionController } from '../../../../presentation/controllers/transaction/find/find-send-transaction-controller'
import { FindTransactionController } from '../../../../presentation/controllers/transaction/find/find-transaction-controller'

export const makeFindAllTransactionController = (): FindTransactionController => {
  const repositoryAdapter = new RepositoryAdapter()
  const findTransactionsRepository = new FindTransactionsRepository(repositoryAdapter)
  return new FindTransactionController(findTransactionsRepository)
}

export const makeFindReceivedTransactionController = (): FindReceivedTransactionController => {
  const repositoryAdapter = new RepositoryAdapter()
  const findTransactionsRepository = new FindTransactionsRepository(repositoryAdapter)
  return new FindReceivedTransactionController(findTransactionsRepository)
}

export const makeFindSendTransactionController = (): FindSendTransactionController => {
  const repositoryAdapter = new RepositoryAdapter()
  const findTransactionsRepository = new FindTransactionsRepository(repositoryAdapter)
  return new FindSendTransactionController(findTransactionsRepository)
}
