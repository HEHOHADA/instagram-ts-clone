import { MigrationInterface, QueryRunner } from 'typeorm'

export class chatMessage1598987312355 implements MigrationInterface {
  name = 'chatMessage1598987312355'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "chatId" uuid NOT NULL, "userId" uuid NOT NULL, "readTime" TIMESTAMP DEFAULT null, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "userChat" ("chatId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_f9d176888015a2558357a81f129" PRIMARY KEY ("chatId", "userId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_7314978933d99c2c040803216f" ON "userChat" ("chatId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_e783df634195d06f0e24f20781" ON "userChat" ("userId") `
    )
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`)
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "userChat" ADD CONSTRAINT "FK_7314978933d99c2c040803216fa" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "userChat" ADD CONSTRAINT "FK_e783df634195d06f0e24f20781b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userChat" DROP CONSTRAINT "FK_e783df634195d06f0e24f20781b"`
    )
    await queryRunner.query(
      `ALTER TABLE "userChat" DROP CONSTRAINT "FK_7314978933d99c2c040803216fa"`
    )
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`
    )
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`
    )
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`)
    await queryRunner.query(`DROP INDEX "IDX_e783df634195d06f0e24f20781"`)
    await queryRunner.query(`DROP INDEX "IDX_7314978933d99c2c040803216f"`)
    await queryRunner.query(`DROP TABLE "userChat"`)
    await queryRunner.query(`DROP TABLE "chat"`)
    await queryRunner.query(`DROP TABLE "message"`)
  }
}
