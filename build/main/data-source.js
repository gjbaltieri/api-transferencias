'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.appDataSource = void 0
require('reflect-metadata')
require('dotenv/config')
const typeorm_1 = require('typeorm')
exports.appDataSource = new typeorm_1.DataSource({
  type: 'postgres',
  port: 5432,
  url: process.env.POSTGRES_URL,
  synchronize: true,
  ssl: true,
  migrations: [`./build/shared/typeorm/migrations/*.{ts,js}`],
  entities: [`./build/infra/typeorm/entities/**.{ts,js}`]
})
