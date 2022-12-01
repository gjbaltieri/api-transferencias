import { UpdateBalanceModel } from '../../../domain/models/db/update-balance-model'
import { UpdateBalance } from '../../../domain/usecases/update-balance'
import { Account } from '../../typeorm/entities/Account'
import { RepositoryAdapter } from '../helper/repository-adapter'

export class UpdateBalanceRepository implements UpdateBalance {
  constructor(private readonly repository: RepositoryAdapter) {}
  async update(accountId: string): Promise<UpdateBalanceModel> {
    const userRepository = this.repository.get(Account)
    const { balance } = await userRepository.findOne({
      where: {
        id: accountId
      }
    })
    return balance
  }
}
