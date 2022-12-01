import { AccountModel } from '../../../domain/models/db/account-model'
import { Hasher } from '../../../domain/models/cryptography/hasher'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { RepositoryModel } from '../../../domain/usecases/repository-model'
import { Account } from '../../typeorm/entities/Account'
import { User } from '../../typeorm/entities/User'

export class AccountTypeORMRepository implements AddAccount {
  constructor(private readonly repository: RepositoryModel, private readonly hasher: Hasher) {}
  async add(account: AddAccountModel): Promise<AccountModel | void> {
    const userRepository = this.repository.get(User)
    const accountRepository = this.repository.get(Account)
    const userExists = await userRepository.findOneBy({ username: account.username })
    if (!userExists) {
      const createUser = userRepository.create({
        username: account.username,
        password: await this.hasher.hash(account.password)
      })
      const saveAccount = await accountRepository.save({})
      createUser.accountId = saveAccount.id
      return await userRepository.save(createUser)
    }
    return
  }
}
