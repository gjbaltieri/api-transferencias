import { BalanceVerify } from '../../../domain/usecases/balance-verify'
import { RepositoryModel } from '../../../domain/usecases/repository-model'
import { InsufficientBalance } from '../../../presentation/errors/insufficient-balance'
import { Account } from '../../typeorm/entities/Account'

export class BalanceVerifyRepository implements BalanceVerify {
  constructor(private readonly repository: RepositoryModel) {}
  async verify(accountId: string, value: number): Promise<Error | number> {
    const accountRepository = this.repository.get(Account)
    const { balance } = await accountRepository.findOneBy({ id: accountId })
    if (balance <= value) {
      return new InsufficientBalance('your balance is insufficient for this transaction.')
    }
    const newBalance = balance - value
    return newBalance
  }
}
