import { AcessAccount } from '../../../domain/usecases/acess-account'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { RequiredFieldValidation } from '../../helper/fields/required-fields'
import { badRequest, ok, serverError } from '../../helper/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoginController implements Controller {
  constructor(private readonly RequiredFieldValidation: RequiredFieldValidation, private readonly acessAccount: AcessAccount) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fieldValidator = this.RequiredFieldValidation.signupCompare(httpRequest.body)
      if (fieldValidator) {
        return badRequest(fieldValidator)
      }

      const { username, password } = httpRequest.body
      const acessToken = await this.acessAccount.login({ username, password })
      if (!acessToken) {
        return badRequest(new InvalidParamError('username or password is wrong.'))
      }
      return ok({ token: acessToken })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
