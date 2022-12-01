import { Repository } from 'typeorm'

export interface RepositoryModel {
  get(value: any): Repository<typeof value>
}
