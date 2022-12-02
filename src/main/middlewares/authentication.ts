import { NextFunction, Request, Response } from 'express'
import { JwtTokenAdapter } from '../../infra/cryptography/token/jwt-token-adapter'
import { unauthorized } from '../../presentation/helper/http/http-helper'

const jwt = new JwtTokenAdapter(process.env.JWT_SECRET as string)

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw res.json(unauthorized())
  }
  const [, token] = authHeader.split(' ')

  try {
    const isValidToken = jwt.verify(token)
    req.user = {
      username: isValidToken.username,
      accountId: isValidToken.accountId,
      balance: isValidToken.balance
    }
    return next()
  } catch (error) {
    console.error(error)
    throw res.json(unauthorized())
  }
}
