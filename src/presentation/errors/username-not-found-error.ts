export class UsernameNotFound extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UsernameNotFound'
  }
}
