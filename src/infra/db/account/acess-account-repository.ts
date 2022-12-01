import { Hasher } from '../../../domain/models/cryptography/hasher'
import { JwtToken } from '../../../domain/models/cryptography/jwt-token'
import { AcessAccount, AcessAccountModel } from '../../../domain/usecases/acess-account'
import { User } from '../../typeorm/entities/User'
import { RepositoryAdapter } from '../helper/repository-adapter'

export class AcessAccountRepository implements AcessAccount {
  constructor(private readonly compareHash: Hasher, private readonly repository: RepositoryAdapter, private readonly jwtToken: JwtToken) {}
  async login(params: AcessAccountModel): Promise<string | void> {
    const userRepository = this.repository.get(User)
    const userExists = await userRepository.findOne({
      where: {
        username: params.username
      },
      relations: {
        accountId: true
      }
    })
    if (!userExists) {
      return
    }
    const comparePassword = await this.compareHash.compare(params.password, userExists.password)
    if (!comparePassword) {
      return
    }
    const accessToken = this.jwtToken.gen({
      accountId: userExists.accountId.id,
      username: userExists.username,
      balance: userExists.accountId.balance
    })
    return accessToken
  }
}
