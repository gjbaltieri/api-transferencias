declare namespace Express {
  export interface Request {
    user: {
      username?: string
      accountId?: string
      balance?: number
    }
  }
}
