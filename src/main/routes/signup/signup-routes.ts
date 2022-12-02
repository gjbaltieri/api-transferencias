import { Router } from 'express'
import { routeAdapter } from '../helper/adapter/routes-adapter'
import { makeSignUpController } from './make-signup-controller'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()))
}
