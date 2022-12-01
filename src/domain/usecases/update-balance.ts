import { UpdateBalanceModel } from '../models/db/update-balance-model'

export interface UpdateBalance {
  update(accountId: string): Promise<UpdateBalanceModel>
}
