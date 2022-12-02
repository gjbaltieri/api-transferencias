import { FindTransactions } from '../../../../domain/usecases/find-transactions'
import { ok, serverError } from '../../../helper/http/http-helper'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class FindTransactionController {
  constructor(private readonly findTransactions: FindTransactions) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest.user
      const { date } = httpRequest.body
      const { limit, skip } = httpRequest.query
      Number(limit), Number(skip)
      const transactions = await this.findTransactions.findAll({ date, accountId, limit, skip })
      return ok(transactions)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
