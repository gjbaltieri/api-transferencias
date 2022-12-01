export interface JwtToken {
  gen(param: any): string
  verify(token: string): boolean | any
}
