import { Router } from 'express'
import { routeAdapter } from '../helper/adapter/routes-adapter'
import { makeLoginController } from './make-login-controller'

export default (router: Router): void => {
  router.post('/login', routeAdapter(makeLoginController()))
}
