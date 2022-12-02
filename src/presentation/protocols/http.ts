interface Params {
  [key: string]: any
}

export interface HttpRequest {
  body?: any
  user?: any
  [key: string]: any
}

export interface HttpResponse {
  statusCode: number
  body?: any
}
