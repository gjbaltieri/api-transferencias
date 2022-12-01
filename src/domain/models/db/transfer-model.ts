export interface TransactionModel {
  id: string
  debitedAccountId: string
  creditedAccountId: string
  value: number
  created_At: Date
}
