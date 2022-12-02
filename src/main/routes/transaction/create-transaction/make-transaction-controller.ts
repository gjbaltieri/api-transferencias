import { RepositoryAdapter } from '../../../../infra/db/helper/repository-adapter'
import { BalanceVerifyRepository } from '../../../../infra/db/verify/balance-verify-repository'
import { TransferValueRepository } from '../../../../infra/db/verify/transfer-value-repository'
import { UserVerifyRepository } from '../../../../infra/db/verify/user-verify-repository'
import { TransactionController } from '../../../../presentation/controllers/transaction/transaction-controller'
import { RequiredFieldValidation } from '../../../../presentation/helper/fields/required-fields'

export const makeTransactionController = (): TransactionController => {
  const repositoryAdapter = new RepositoryAdapter()
  const userVerify = new UserVerifyRepository(repositoryAdapter)
  const requiredFields = new RequiredFieldValidation()
  const balanceVerify = new BalanceVerifyRepository(repositoryAdapter)
  const transferValue = new TransferValueRepository(repositoryAdapter)
  return new TransactionController(requiredFields, userVerify, balanceVerify, transferValue)
}
