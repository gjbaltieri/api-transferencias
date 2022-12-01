"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1668879261795 = void 0;
class default1668879261795 {
    constructor() {
        this.name = 'default1668879261795';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric NOT NULL DEFAULT '100', "created_At" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric NOT NULL, "created_At" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "debitedAccountIdId" uuid, "creditedAccountIdId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "created_At" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "accountIdId" uuid, CONSTRAINT "REL_dabe5e3605c501f94e0e2fe255" UNIQUE ("accountIdId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_e273767b6b33dba7abb99e10b1c" FOREIGN KEY ("debitedAccountIdId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_527cedd8e1971381b07e686448d" FOREIGN KEY ("creditedAccountIdId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dabe5e3605c501f94e0e2fe255b" FOREIGN KEY ("accountIdId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dabe5e3605c501f94e0e2fe255b"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_527cedd8e1971381b07e686448d"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_e273767b6b33dba7abb99e10b1c"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "transaction"`);
            yield queryRunner.query(`DROP TABLE "account"`);
        });
    }
}
exports.default1668879261795 = default1668879261795;
