import { BalanceVerify } from '../../../domain/usecases/balance-verify'
import { TransferValue } from '../../../domain/usecases/transfer-value'
import { UserVerify } from '../../../domain/usecases/user-verify'
import { RequiredFieldValidation } from '../../helper/fields/required-fields'
import { badRequest, conditionFailed, ok, serverError } from '../../helper/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class TransactionController implements Controller {
  constructor(
    private readonly requiredFieldValidation: RequiredFieldValidation,
    private readonly userVerify: UserVerify,
    private readonly balanceVerify: BalanceVerify,
    private readonly transferValue: TransferValue
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fieldValidator = this.requiredFieldValidation.transactionCompare(httpRequest.body)
      if (fieldValidator) {
        return badRequest(fieldValidator)
      }
      const { username, value } = httpRequest.body
      const userVerify = await this.userVerify.verify(username, httpRequest.user.username)
      if (userVerify instanceof Error) {
        return conditionFailed(userVerify)
      }
      const balanceIsAvailable = await this.balanceVerify.verify(userVerify.debitedAccountId, value)
      if (balanceIsAvailable instanceof Error) {
        return conditionFailed(balanceIsAvailable)
      }
      httpRequest.user.balance = balanceIsAvailable
      const transferValue = await this.transferValue.execute(userVerify, value)
      const data = { ...transferValue, balance: balanceIsAvailable }
      return ok(data)
    } catch (error) {
      return serverError()
    }
  }
}
