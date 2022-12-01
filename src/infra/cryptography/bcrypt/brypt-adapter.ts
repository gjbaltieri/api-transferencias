import bcrypt from 'bcrypt'
import { Hasher } from '../../../domain/models/cryptography/hasher'

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
  async compare(value: string, valueToCompare: string): Promise<boolean> {
    return await bcrypt.compare(value, valueToCompare)
  }
}
