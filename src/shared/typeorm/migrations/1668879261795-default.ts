import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668879261795 implements MigrationInterface {
    name = 'default1668879261795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric NOT NULL DEFAULT '100', "created_At" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric NOT NULL, "created_At" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "debitedAccountIdId" uuid, "creditedAccountIdId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "created_At" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "accountIdId" uuid, CONSTRAINT "REL_dabe5e3605c501f94e0e2fe255" UNIQUE ("accountIdId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_e273767b6b33dba7abb99e10b1c" FOREIGN KEY ("debitedAccountIdId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_527cedd8e1971381b07e686448d" FOREIGN KEY ("creditedAccountIdId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dabe5e3605c501f94e0e2fe255b" FOREIGN KEY ("accountIdId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dabe5e3605c501f94e0e2fe255b"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_527cedd8e1971381b07e686448d"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_e273767b6b33dba7abb99e10b1c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
