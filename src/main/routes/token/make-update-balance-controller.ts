import { JwtTokenAdapter } from '../../../infra/cryptography/token/jwt-token-adapter'
import { UpdateBalanceRepository } from '../../../infra/db/balance/update-balance'
import { RepositoryAdapter } from '../../../infra/db/helper/repository-adapter'
import { TokenController } from '../../../presentation/controllers/token/token-controller'

export const makeTokenController = (): TokenController => {
  const jwtValidation = new JwtTokenAdapter(process.env.JWT_SECRET as string)
  const repositoryAdapter = new RepositoryAdapter()
  const updateBalance = new UpdateBalanceRepository(repositoryAdapter)
  return new TokenController(jwtValidation, updateBalance)
}
