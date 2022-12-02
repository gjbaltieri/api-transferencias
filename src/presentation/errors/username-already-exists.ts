export class UsernameAlreadyExists extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserAlreadyExists'
  }
}
