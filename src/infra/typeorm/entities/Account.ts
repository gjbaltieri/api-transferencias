import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

interface AccountInterfaceModel {
  id: string
  balance: number
  created_At: Date
}

@Entity()
export class Account implements AccountInterfaceModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'decimal', scale: 2, default: 100 })
  balance: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date
}
