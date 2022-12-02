export interface paramsValidator {
  username: string
  password: string
}

export interface ParamsValidator {
  validate(params: paramsValidator): Error | void
}
