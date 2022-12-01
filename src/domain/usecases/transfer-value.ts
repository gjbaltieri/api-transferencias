import { TransactionModel } from '../models/db/transfer-model'
import { verifiedUser } from './user-verify'

export interface TransferValue {
  execute(params: verifiedUser, value: number): Promise<TransactionModel | void>
}
