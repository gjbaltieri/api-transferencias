"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    port: 5432,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    migrations: [`./**/shared/typeorm/migrations/*.{ts,js}`],
    entities: [`./**/infra/typeorm/entities/**.{ts,js}`]
});
