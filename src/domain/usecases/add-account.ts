import { AccountModel } from '../models/db/account-model'

export interface AddAccountModel {
  username: string
  password: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel | void>
}
