import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1673962893743 implements MigrationInterface {
  public readonly SQL_CREATE = `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "users_email_var_unique" UNIQUE ("email"), CONSTRAINT "users_id_PK" PRIMARY KEY ("id"))`
  public readonly SQL_DROP = `DROP TABLE "users"`

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.SQL_CREATE)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.SQL_DROP)
  }
}
