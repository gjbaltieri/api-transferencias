import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'

export const appDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  url: 'postgres://dbpostgres:CFY7hsY3wFBCBX3iK2UsZ5oIEUTsMmGd@dpg-ce4dap9gp3jocdeauvf0-a.oregon-postgres.render.com/dbpostgres_niyv',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  migrations: [`./**/shared/typeorm/migrations/*.{ts,js}`],
  entities: [`./**/infra/typeorm/entities/**.{ts,js}`]
})
