import { addMilliseconds, addYears } from 'date-fns'
import { Between, In } from 'typeorm'
import { appDataSource } from '../../../main/data-source'
import { Transaction } from '../entities/Transaction'
import { User } from '../entities/User'

const addMs = (date: string): Date => {
  if (date === '1999-01-01' || date.length <= 1) {
    console.log('data antes', date)
    date === '1999-01-01'
    console.log('data depois', date)
    const addy = addYears(new Date(date), 100)
    return addy
  }
  const addms = addMilliseconds(new Date(date), 86399999)
  return addms
}

export const customTransactionsRepository = appDataSource.getRepository(Transaction).extend({
  async findAllTransactions(date: string = '1999-01-01', accountId: string, limit: number, skip: number) {
    return await this.find({
      relations: {
        debitedAccountId: true,
        creditedAccountId: true
      },
      where: [
        {
          debitedAccountId: {
            id: accountId
          },
          created_At: Between(new Date(date), addMs(date))
        },
        {
          creditedAccountId: {
            id: accountId
          },
          created_At: Between(new Date(date), addMs(date))
        }
      ],
      skip: skip,
      take: limit,
      select: {
        creditedAccountId: {
          id: true
        },
        debitedAccountId: {
          id: true
        }
      },
      order: {
        created_At: 'DESC'
      }
    })
  },
  async findSendTransactions(date: string = '1999-01-01', accountId: string, limit: number, skip: number) {
    return await this.find({
      relations: {
        debitedAccountId: true,
        creditedAccountId: true
      },

      where: {
        debitedAccountId: {
          id: accountId
        },
        created_At: Between(new Date(date), addMs(date))
      },
      skip: skip,
      take: limit,
      select: {
        creditedAccountId: {
          id: true
        },
        debitedAccountId: {
          id: true
        }
      },
      order: {
        created_At: 'DESC'
      }
    })
  },
  async findReceivedTransactions(date: string = '1999-01-01', accountId: string, limit: number, skip: number) {
    return await this.find({
      relations: {
        debitedAccountId: true,
        creditedAccountId: true
      },
      where: {
        creditedAccountId: {
          id: accountId
        },
        created_At: Between(new Date(date), addMs(date))
      },
      skip: skip,
      take: limit,
      select: {
        creditedAccountId: {
          id: true
        },
        debitedAccountId: {
          id: true
        }
      },
      order: {
        created_At: 'DESC'
      }
    })
  }
})

export const customUserRepository = appDataSource.getRepository(User).extend({
  async findUsernameByAccountId(accountId: string[]) {
    return await this.find({
      relations: {
        accountId: true
      },
      where: {
        accountId: {
          id: In(accountId)
        }
      }
    })
  }
})
