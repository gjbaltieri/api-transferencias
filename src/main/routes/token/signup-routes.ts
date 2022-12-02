import { Router } from 'express'
import { routeAdapter } from '../helper/adapter/routes-adapter'
import { makeTokenController } from './make-update-balance-controller'

export default (router: Router): void => {
  router.post('/token', routeAdapter(makeTokenController()))
}
