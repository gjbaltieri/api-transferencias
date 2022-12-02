import { AddAccount } from '../../../domain/usecases/add-account'
import { UsernameAlreadyExists } from '../../errors/username-already-exists'
import { RequiredFieldValidation } from '../../helper/fields/required-fields'
import { badRequest, conflict, ok, serverError } from '../../helper/http/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ParamsValidator } from '../../protocols/param-validator'

export class signUpController {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly requiredFieldValidation: RequiredFieldValidation,
    private readonly paramsValidator: ParamsValidator
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fieldValidator = this.requiredFieldValidation.signupCompare(httpRequest.body)
      if (fieldValidator) {
        return badRequest(fieldValidator)
      }
      const { username, password } = httpRequest.body
      const paramsValidator = this.paramsValidator.validate({ username, password })
      if (paramsValidator) {
        return badRequest(paramsValidator)
      }
      const addAccount = await this.addAccount.add({ username, password })
      if (!addAccount) {
        return conflict(new UsernameAlreadyExists('Username already exists'))
      }
      return ok(addAccount)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
