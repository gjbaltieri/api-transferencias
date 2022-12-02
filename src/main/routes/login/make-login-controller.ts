import { BcryptAdapter } from '../../../infra/cryptography/bcrypt/brypt-adapter'
import { JwtTokenAdapter } from '../../../infra/cryptography/token/jwt-token-adapter'
import { AcessAccountRepository } from '../../../infra/db/account/acess-account-repository'
import { RepositoryAdapter } from '../../../infra/db/helper/repository-adapter'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { RequiredFieldValidation } from '../../../presentation/helper/fields/required-fields'

export const makeLoginController = (): LoginController => {
  const repositoryAdapter = new RepositoryAdapter()
  const hasher = new BcryptAdapter(12)
  const jwt = new JwtTokenAdapter(process.env.JWT_SECRET as string)
  const addAccount = new AcessAccountRepository(hasher, repositoryAdapter, jwt)
  const requiredFields = new RequiredFieldValidation()
  return new LoginController(requiredFields, addAccount)
}
