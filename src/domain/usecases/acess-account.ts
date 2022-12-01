export interface AcessAccountModel {
  username: string
  password: string
}

export interface AcessAccount {
  login(params: AcessAccountModel): Promise<string | void>
}
