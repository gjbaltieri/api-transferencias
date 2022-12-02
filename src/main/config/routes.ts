import { Express, Router } from 'express'
import fg from 'fast-glob'

export const routes = (app: Express): void => {
  const router = Router()
  app.use('/', router)
  fg.sync('**/**/main/routes/**/**-routes{.ts,.js}').map(async (file: any) => (await import(`../../../${file}`)).default(router))
}
