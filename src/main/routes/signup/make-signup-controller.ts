import { BcryptAdapter } from '../../../infra/cryptography/bcrypt/brypt-adapter'
import { AccountTypeORMRepository } from '../../../infra/db/account/add-account-repository'
import { RepositoryAdapter } from '../../../infra/db/helper/repository-adapter'
import { ParamsValidatorAdapter } from '../../../infra/validator/params-validator-adapter'
import { signUpController } from '../../../presentation/controllers/signup/signup-controller'
import { RequiredFieldValidation } from '../../../presentation/helper/fields/required-fields'

export const makeSignUpController = (): signUpController => {
  const repositoryAdapter = new RepositoryAdapter()
  const hasher = new BcryptAdapter(12)
  const addAccount = new AccountTypeORMRepository(repositoryAdapter, hasher)
  const validator = new ParamsValidatorAdapter()
  const requiredFields = new RequiredFieldValidation()
  return new signUpController(addAccount, requiredFields, validator)
}
