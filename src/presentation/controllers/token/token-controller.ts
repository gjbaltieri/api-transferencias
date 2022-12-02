import { JwtToken } from '../../../domain/models/cryptography/jwt-token'
import { UpdateBalance } from '../../../domain/usecases/update-balance'
import { ok, unauthorized } from '../../helper/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class TokenController implements Controller {
  constructor(private readonly tokenVerify: JwtToken, private readonly updateBalance: UpdateBalance) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token } = httpRequest.body
      const isValid = this.tokenVerify.verify(token)
      const verifyBalance = await this.updateBalance.update(isValid.accountId)
      return ok({ user: isValid, balance: verifyBalance })
    } catch (error) {
      console.error(error)
      return unauthorized()
    }
  }
}
