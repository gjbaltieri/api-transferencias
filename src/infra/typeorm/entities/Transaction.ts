import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import 'reflect-metadata'
import { Account } from './Account'

interface TransactionModel {
  id: string
  debitedAccountId: Account
  creditedAccountId: Account
  value: number
  created_At: Date
}

@Entity()
export class Transaction implements TransactionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn()
  debitedAccountId: Account

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn()
  creditedAccountId: Account

  @Column({ type: 'decimal', scale: 2 })
  value: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date
}
