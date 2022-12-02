import { Controller } from '../../../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols/http'
import { Request, Response } from 'express'

export const routeAdapter = (controller: Controller): any => {
  return async (req: Request, res: Response): Promise<any> => {
    const httpRequest: HttpRequest = {
      body: req.body,
      user: req.user,
      query: req.query
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
    }
  }
}
