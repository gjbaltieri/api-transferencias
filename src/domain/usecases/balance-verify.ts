export interface BalanceVerify {
  verify(accountId: string, value: number): Promise<Error | number>
}
