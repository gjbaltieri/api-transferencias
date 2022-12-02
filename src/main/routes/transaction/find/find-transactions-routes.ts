import { Router } from 'express'
import isAuthenticated from '../../../middlewares/authentication'
import { routeAdapter } from '../../helper/adapter/routes-adapter'
import {
  makeFindAllTransactionController,
  makeFindReceivedTransactionController,
  makeFindSendTransactionController
} from './make-find-controller'

export default (router: Router): void => {
  router.post('/my-transfers', isAuthenticated, routeAdapter(makeFindAllTransactionController()))
  router.post('/my-transfers/received', isAuthenticated, routeAdapter(makeFindReceivedTransactionController()))
  router.post('/my-transfers/send', isAuthenticated, routeAdapter(makeFindSendTransactionController()))
}
