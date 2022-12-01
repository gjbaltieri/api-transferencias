import { RepositoryModel } from '../../../domain/usecases/repository-model'
import { UserVerify, verifiedUser } from '../../../domain/usecases/user-verify'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { UsernameNotFound } from '../../../presentation/errors/username-not-found-error'
import { User } from '../../typeorm/entities/User'

export class UserVerifyRepository implements UserVerify {
  constructor(private readonly repository: RepositoryModel) {}
  async verify(usernameToReceive: string, username: string): Promise<Error | verifiedUser> {
    const userRepository = this.repository.get(User)
    const usernameToReceiveValue = await userRepository.findOne({
      where: {
        username: usernameToReceive
      },
      relations: {
        accountId: true
      }
    })
    if (!usernameToReceiveValue) {
      return new UsernameNotFound('Username not found.')
    }
    if (usernameToReceiveValue.username === username) {
      return new InvalidParamError('You cannot send to yourself.')
    }
    const usernameToSend = await userRepository.findOne({
      where: {
        username: username
      },
      relations: {
        accountId: true
      }
    })
    return {
      creditedAccountId: usernameToReceiveValue.accountId.id,
      debitedAccountId: usernameToSend.accountId.id
    }
  }
}
