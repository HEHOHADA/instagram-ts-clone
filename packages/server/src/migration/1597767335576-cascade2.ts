import { MigrationInterface, QueryRunner } from 'typeorm'

export class cascade21597767335576 implements MigrationInterface {
  name = 'cascade21597767335576'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e24989f445c2652f8ebc326667f"`)
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c"`
    )
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`)
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_e24989f445c2652f8ebc326667f" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c"`
    )
    await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e24989f445c2652f8ebc326667f"`)
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_e24989f445c2652f8ebc326667f" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
