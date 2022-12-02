import { Router } from 'express'
import isAuthenticated from '../../../middlewares/authentication'
import { routeAdapter } from '../../helper/adapter/routes-adapter'
import { makeTransactionController } from './make-transaction-controller'

export default (router: Router): void => {
  router.post('/transfer', isAuthenticated, routeAdapter(makeTransactionController()))
}
