import { ServerError } from '../../errors/server-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError('Unauthorized')
})

export const serverError = (error?: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error?.stack || 'Server Error')
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const conflict = (error: Error): HttpResponse => {
  return {
    statusCode: 409,
    body: error
  }
}

export const conditionFailed = (error: Error): HttpResponse => {
  return {
    statusCode: 412,
    body: error
  }
}
