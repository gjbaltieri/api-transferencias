import { TransactionModel } from '../../../domain/models/db/transfer-model'
import { RepositoryModel } from '../../../domain/usecases/repository-model'
import { TransferValue } from '../../../domain/usecases/transfer-value'
import { verifiedUser } from '../../../domain/usecases/user-verify'
import { Account } from '../../typeorm/entities/Account'
import { Transaction } from '../../typeorm/entities/Transaction'

export class TransferValueRepository implements TransferValue {
  constructor(private readonly repository: RepositoryModel) {}
  async execute({ creditedAccountId, debitedAccountId }: verifiedUser, value: number): Promise<TransactionModel | void> {
    const transactionRepository = this.repository.get(Transaction)
    const accountRepository = this.repository.get(Account)
    const debitedAccount = await accountRepository.findOneBy({ id: debitedAccountId })
    const creditedAccount = await accountRepository.findOneBy({ id: creditedAccountId })
    debitedAccount.balance = Number(debitedAccount.balance) - Number(value)
    creditedAccount.balance = Number(creditedAccount.balance) + Number(value)
    await accountRepository.update({ id: debitedAccountId }, { balance: debitedAccount.balance })
    await accountRepository.update({ id: creditedAccountId }, { balance: creditedAccount.balance })
    const createTransaction = transactionRepository.create({
      creditedAccountId,
      debitedAccountId,
      value
    })
    return await transactionRepository.save(createTransaction)
  }
}
