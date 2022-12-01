export interface verifiedUser {
  debitedAccountId: string
  creditedAccountId: string
}

export interface UserVerify {
  verify(usernameToReceive: string, username: string): Promise<verifiedUser | Error>
}
