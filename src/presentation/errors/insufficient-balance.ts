export class InsufficientBalance extends Error {
  constructor(invalidParam: string) {
    super(`Invalid action: ${invalidParam}`)
    this.name = 'InsufficientBalance'
  }
}
