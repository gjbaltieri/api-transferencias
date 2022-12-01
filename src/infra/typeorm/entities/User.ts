import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import 'reflect-metadata'
import { Account } from './Account'
import { AccountModel } from '../../../domain/models/db/account-model'

@Entity()
export class User implements AccountModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  username: string

  @Column({ type: 'varchar' })
  password: string

  @OneToOne(() => Account, (account) => account.id)
  @JoinColumn()
  accountId: Account

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date
}
