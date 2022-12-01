import validator from 'validator'
import { InvalidParamError } from '../../presentation/errors/invalid-param-error'
import { paramsValidator, ParamsValidator } from '../../presentation/protocols/param-validator'

export class ParamsValidatorAdapter implements ParamsValidator {
  validate(params: paramsValidator): Error | void {
    const userName = validator.isLength(params.username, { min: 3 })
    if (!userName) {
      return new InvalidParamError('Username must contain at least 3 characters.')
    }
    const password = validator.isStrongPassword(params.password, { minLength: 8, minUppercase: 1, minNumbers: 1 })
    if (!password) {
      return new InvalidParamError('The password must contain at least 8 characters, at least one uppercase and one number.')
    }
  }
}
