import { JwtToken } from '../../../domain/models/cryptography/jwt-token'
import * as jwt from 'jsonwebtoken'

export class JwtTokenAdapter implements JwtToken {
  constructor(private readonly secret: string) {}
  gen(param: any): string {
    const token = jwt.sign(param, this.secret, { expiresIn: '1d' })
    return token
  }
  verify(token: string): any {
    return jwt.verify(token, this.secret)
  }
}
